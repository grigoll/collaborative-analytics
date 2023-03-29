import {
	ChartCommentThread,
	ChartCommentThreadWithComments,
	ChartDataItem,
	ChartDataPoint,
} from '@/types/chart';

export type ChartDataResponse = ChartDataItem[];

export type ChartCommentThreadsResponse = ChartCommentThread[];

export type ChartCommentThreadResponse = ChartCommentThreadWithComments;

export type ChartShareResponse = {
	token: string;
};

// Fields name casing below is a bit inconsistent with the rest but that's the way BE requires
type RequestCommentData = {
	text: string;
	user_name: string;
};

export type CreateCommentThreadRequestData = {
	comment: RequestCommentData;
	data_point: ChartDataPoint;
};

export type RespondToCommentThreadRequestData = {
	comment: RequestCommentData;
};
