import { ChartDataPointKey } from '@/types/chart';

import { GlobalStoreActions, GlobalStoreState } from './types';

/**
 * State selectors
 */
const chartData = (s: GlobalStoreState) => s.chartData;

const commentThread = (s: GlobalStoreState, key: ChartDataPointKey) =>
	s.commentThreads.get(key) ?? null;

const activeThreadKey = (s: GlobalStoreState) => s.activeCommentThreadKey;

const activeThreadComments = (s: GlobalStoreState) => s.activeCommentThread?.comments ?? null;

const activeThreadCommentCount = (s: GlobalStoreState) =>
	s.activeCommentThread?.comments.length ?? 0;

const activeThreadCommentsLoading = (s: GlobalStoreState) => s.activeCommentThreadLoading;

const commentsCount = (s: GlobalStoreState, key: ChartDataPointKey) =>
	commentThread(s, key)?.commentsCount ?? 0;

const postCommentLoading = (s: GlobalStoreState) => s.postCommentLoading;

const isReadonlyMode = (s: GlobalStoreState) => Boolean(s.sharedChartToken);

export const stateSelectors = {
	chartData,
	commentThread,
	commentsCount,
	activeThreadKey,
	activeThreadComments,
	activeThreadCommentCount,
	activeThreadCommentsLoading,
	postCommentLoading,
	isReadonlyMode,
};

/**
 * Action selectors
 */
const loadChart = (s: GlobalStoreActions) => s.loadChart;

const postComment = (s: GlobalStoreActions) => s.postCommentToThread;

// Display the comment section
const showComments = (s: GlobalStoreActions) => s.showCommentThread;

// Fetch the comments
const loadComments = (s: GlobalStoreActions) => s.loadThreadComments;

const saveToken = (s: GlobalStoreActions) => s.saveSharedChartToken;

export const actionSelectors = {
	loadChart,
	showComments,
	loadComments,
	postComment,
	saveToken,
};
