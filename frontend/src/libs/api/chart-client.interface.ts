import { HttpVerbOptions } from '../http/types';
import {
	ChartCommentThreadResponse,
	ChartCommentThreadsResponse,
	ChartDataResponse,
	ChartShareResponse,
	CreateCommentThreadRequestData,
	RespondToCommentThreadRequestData,
} from './types';

export interface ChartApiClient {
	getChartData: () => Promise<ChartDataResponse>;

	getCommentThreads: () => Promise<ChartCommentThreadsResponse>;

	getCommentThread: (
		threadId: string,
		opts?: HttpVerbOptions,
	) => Promise<ChartCommentThreadResponse>;

	createCommentThread: (
		data: CreateCommentThreadRequestData,
	) => Promise<ChartCommentThreadResponse>;

	respondToCommentThread: (
		threadId: string,
		data: RespondToCommentThreadRequestData,
	) => Promise<ChartCommentThreadResponse>;

	getChartShareable: () => Promise<ChartShareResponse>;

	getSharedChartData: (identifier: string) => Promise<ChartDataResponse>;
}
