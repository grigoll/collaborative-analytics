import {
	ChartComment,
	ChartCommentThread,
	ChartCommentThreadWithComments,
	ChartDataItem,
	ChartDataPointKey,
} from '@/types/chart';

export type GlobalStoreState = {
	chartData: ChartDataItem[];
	commentThreads: Map<ChartDataPointKey, ChartCommentThread>;
	activeCommentThreadKey: ChartDataPointKey | null; // Necessary for creating new thread
	activeCommentThread: ChartCommentThreadWithComments | null;
	activeCommentThreadLoading: boolean;
	postCommentLoading: boolean;
	sharedChartToken: string | null;
};

export type GlobalStoreActions = {
	loadChart: () => Promise<void>;
	saveSharedChartToken: (sharedToken: string) => Promise<boolean>;
	showCommentThread: (threadKey: ChartDataPointKey) => Promise<void>;
	loadThreadComments: (threadKey: ChartDataPointKey) => Promise<void>;
	postCommentToThread: (data: ChartComment) => Promise<void>;
	resetStore: () => Promise<void>;
};
