import { FC, useCallback } from 'react';
import { chakra } from '@chakra-ui/react';
import { BarChartItem, BarChartItemProps } from '@/components/bar-chart/item.component';
import { useGlobalStore } from '@/store/chart.store';
import { actionSelectors, stateSelectors } from '@/store/selectors';
import { ChartDataCountry, ChartDataFeature, ChartDataItem } from '@/types/chart';
import { chartDataPointToThreadKey } from '@/utils';

import { CountryFoodChartTooltip } from './tooltip.component';

export const CountryFoodChartItem: FC<BarChartItemProps<ChartDataItem>> = (props) => {
	const key = chartDataPointToThreadKey({
		country: props.bar.data.indexValue as ChartDataCountry,
		feature: props.bar.data.id as ChartDataFeature,
	});

	const commentCount = useGlobalStore((s) => stateSelectors.commentsCount(s, key));
	const showComments = useGlobalStore(actionSelectors.showComments);

	const showThread = useCallback(() => showComments(key), [key, showComments]);

	return (
		<chakra.g fontWeight='bold' cursor='pointer'>
			<BarChartItem
				{...props}
				label={`${commentCount}`}
				tooltip={CountryFoodChartTooltip}
				onClick={showThread}
			/>
		</chakra.g>
	);
};
