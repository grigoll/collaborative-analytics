import { chartApiClient } from '@/libs/api/shared';
import {
	CreateCommentThreadRequestData,
	RespondToCommentThreadRequestData,
} from '@/libs/api/types';
import { HttpVerbOptions } from '@/libs/http/types';
import { ChartCommentThread, ChartDataItem, ChartDataPointKey } from '@/types/chart';
import { HttpError, InvalidTokenError } from '@/types/error';
import { chartDataPointToThreadKey } from '@/utils';

const NOT_FOUND = 404;

export const fetchChartData = () => chartApiClient.getChartData();

export const fetchSharedChartData = async (token: string): Promise<ChartDataItem[]> => {
	try {
		const chartData = await chartApiClient.getSharedChartData(token);

		return chartData;
	} catch (error) {
		if (error instanceof HttpError && error.code === NOT_FOUND) {
			throw new InvalidTokenError();
		}

		throw error;
	}
};

export const fetchCommentThreads = async (): Promise<
	Map<ChartDataPointKey, ChartCommentThread>
> => {
	const threads = await chartApiClient.getCommentThreads();

	const mappedThreads = threads.reduce(
		(map, thread) => map.set(chartDataPointToThreadKey(thread.chartDataPoint), thread),
		new Map(),
	);

	return mappedThreads;
};

export const loadThreadWithComments = async (id: string, opts?: Pick<HttpVerbOptions, 'signal'>) =>
	chartApiClient.getCommentThread(id, opts);

export const createCommentThread = async (data: CreateCommentThreadRequestData) =>
	chartApiClient.createCommentThread(data);

export const respondToCommentThread = async (
	threadId: string,
	data: RespondToCommentThreadRequestData,
) => chartApiClient.respondToCommentThread(threadId, data);
