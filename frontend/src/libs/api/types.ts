import { ChartComment, ChartCommentThread, ChartDataItem, ChartDataPoint } from '@/types/chart';

export type ChartDataResponse = ChartDataItem[];

export type ChartCommentThreadsResponse = ChartCommentThread[];

export type ChartCommentThreadResponse = ChartCommentThread & {
	comments: ChartComment[];
};

export type CreateCommentThreadRequestData = {
	comment: ChartComment;
	dataPoint: ChartDataPoint;
};

export type RespondToCommentThreadRequestData = {
	comment: ChartComment;
};

export type ChartShareResponse = {
	token: string;
};
