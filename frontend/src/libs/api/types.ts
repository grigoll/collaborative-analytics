import {
	ChartCommentThread,
	ChartDataCountry,
	ChartDataFeature,
	ChartDataPoint,
} from '@/types/chart';

type ChartDataResponseItem = { country: ChartDataCountry } & { [key in ChartDataFeature]: number };
export type ChartDataResponse = ChartDataResponseItem[];

export type ChartCommentThreadsResponse = ChartCommentThread[];

export type ChartCommentThreadResponse = ChartCommentThread & {
	comments: Comment[];
};

export type CreateCommentThreadRequestData = {
	comment: Comment;
	data_point: ChartDataPoint;
};

export type RespondToCommentThreadRequestData = {
	comment: Comment;
};

export type ChartShareResponse = {
	token: string;
};
