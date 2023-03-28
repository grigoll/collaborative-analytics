import { FC } from 'react';
import { BarChartItem, BarChartItemProps } from '@/components/bar-chart/item.component';
import { useChartStore } from '@/store/chart.store';
import { ChartDataCountry, ChartDataFeature, ChartDataItem } from '@/types/chart';
import { computeChartDataPointKey } from '@/utils/chart';

export const CountryFoodChartItem: FC<BarChartItemProps<ChartDataItem>> = (props) => {
	const key = computeChartDataPointKey({
		country: props.bar.data.indexValue as ChartDataCountry,
		feature: props.bar.data.id as ChartDataFeature,
	});

	const thread = useChartStore((s) => s.commentThreads.get(key));

	return (
		<BarChartItem
			{...props}
			label={`${thread?.commentsCount ?? 0}`}
			onClick={() => alert('TODO: Add comment')}
		/>
	);
};
