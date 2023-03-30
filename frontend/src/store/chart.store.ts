import { create } from 'zustand';
import { logger } from '@/libs/logger';
import { chartDataPointToThreadKey, sleep, threadKeyToChartDataPoint } from '@/utils';

import {
	createCommentThread,
	fetchChartData,
	fetchCommentThreads,
	fetchSharedChartData,
	loadThreadWithComments,
	respondToCommentThread,
} from './helpers';
import { storeLogger } from './logger.middleware';
import { GlobalStoreActions, GlobalStoreState } from './types';

let loadThreadCommentsController: AbortController | null = null;

export type GlobalStore = GlobalStoreState & GlobalStoreActions;

export const useGlobalStore = create<GlobalStore>()(
	storeLogger((set, get) => ({
		sharedChartToken: null,
		saveSharedChartToken: async (token) => {
			set({ sharedChartToken: token });
			return true;
		},

		chartData: [],
		commentThreads: new Map(),
		loadChart: async () => {
			logger.debug('Load chart data init');
			const { sharedChartToken } = get();

			// We need to aggregate both data first to display the meaningful chart
			let chartData: GlobalStore['chartData'];
			let commentThreads: GlobalStore['commentThreads'];

			if (sharedChartToken) {
				// if shared token is used, do fetches step by step so if token is invalid
				// the execution stops and we won't expose comments data
				chartData = await fetchSharedChartData(sharedChartToken);
				commentThreads = await fetchCommentThreads();
			} else {
				[chartData, commentThreads] = await Promise.all([
					fetchChartData(),
					fetchCommentThreads(),
				]);
			}

			set({ chartData, commentThreads });
			logger.debug('Updated store with chart data', { chartData, commentThreads });
		},

		activeCommentThreadKey: null,
		showCommentThread: async (threadKey) => {
			set({ activeCommentThreadKey: threadKey });
			logger.debug('Active comment thread changed', { threadKey });
		},

		activeCommentThread: null,
		activeCommentThreadLoading: false,
		loadThreadComments: async (threadKey) => {
			try {
				logger.debug('Load thread comments init');
				const { commentThreads } = get();

				loadThreadCommentsController?.abort();

				set({
					activeCommentThread: null,
					activeCommentThreadLoading: true,
				});

				const thread = commentThreads.get(threadKey);
				if (!thread) {
					await sleep(200); // for non jittery loader UX
					set({ activeCommentThreadLoading: false });
					logger.debug('Comment thread does not exist yet. Nothing to load');

					return;
				}

				// to cancel the request if a user switches between threads quickly
				loadThreadCommentsController = new AbortController();

				const [activeCommentThread] = await Promise.all([
					loadThreadWithComments(thread.id, {
						signal: loadThreadCommentsController.signal,
					}),
					sleep(200), // for non jittery loader UX
				]);

				set({
					activeCommentThread,
					activeCommentThreadLoading: false,
				});
				logger.debug('Loaded thread comments', { activeCommentThread });
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					logger.debug('Previous comment thread fetch request was cancelled');
					return;
				}

				throw err;
			}
		},

		postCommentLoading: false,
		postCommentToThread: async (data) => {
			logger.debug('Post comment to thread init');
			set({ postCommentLoading: true });

			// remap to match BE name casing
			const comment = {
				text: data.text,
				user_name: data.userName,
			};

			let updatedThread: GlobalStore['activeCommentThread'];
			const { activeCommentThread, activeCommentThreadKey } = get();

			if (activeCommentThread) {
				updatedThread = await respondToCommentThread(activeCommentThread.id, {
					comment,
				});
				logger.debug('Posted comment to an existing thread', { updatedThread });
			} else if (activeCommentThreadKey) {
				updatedThread = await createCommentThread({
					comment,
					data_point: threadKeyToChartDataPoint(activeCommentThreadKey),
				});
				logger.debug('Posted comment to a newly created thread', { updatedThread });
			} else {
				throw new TypeError(
					'Failed to post a comment. Neither thread exists nor data point is selected.',
				);
			}

			const threadKey = chartDataPointToThreadKey(updatedThread.chartDataPoint);
			const updatedThreads = new Map(get().commentThreads).set(threadKey, updatedThread);

			set({
				commentThreads: updatedThreads,
				activeCommentThread: updatedThread,
				postCommentLoading: false,
			});
			logger.debug('Updated store with latest comments', { updatedThread });
		},
	})),
);
