import { create } from 'zustand';
import { chartApiClient } from '@/libs/api/shared';
import { ChartCommentThread, ChartDataPointKey } from '@/types/chart';
import { computeChartDataPointKey } from '@/utils/chart';

type ChartStore = {
	commentThreads: Map<ChartDataPointKey, ChartCommentThread>;
	loadCommentThreads: () => Promise<void>;
};

export const useChartStore = create<ChartStore>((set) => ({
	commentThreads: new Map(),

	loadCommentThreads: async () => {
		const threads = await chartApiClient.getCommentThreads();

		const commentThreads = threads.reduce(
			(map, thread) => map.set(computeChartDataPointKey(thread.chartDataPoint), thread),
			new Map(),
		);

		set({ commentThreads });
	},
}));
