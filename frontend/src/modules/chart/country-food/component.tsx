import { FC, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { BarChart, BarChartProps } from '@/components/bar-chart/component';
import { useChartApiClient } from '@/providers/chart-api-client.provider';
import { useChartStore } from '@/store/chart.store';
import { ChartDataCountry, ChartDataFeature, ChartDataItem } from '@/types/chart';
import { countryName } from '@/utils/intl';

import { CountryFoodChartItem } from './item.component';

type CountryFoodChartProps = BarChartProps<ChartDataItem>;

export const CountryFoodChartContainer: FC = () => {
	const chartApi = useChartApiClient();

	const loadCommentThreads = useChartStore((s) => s.loadCommentThreads);

	const { data: chartData } = useSWR('BarChartContainer/getChartData', chartApi.getChartData, {
		suspense: true,
	});

	const features = useMemo<CountryFoodChartProps['keys']>(
		() => Object.values(ChartDataFeature),
		[],
	);

	const colors = useMemo<CountryFoodChartProps['colors']>(
		() => ['#2b92f1', '#f2994e', '#00b061', '#ff7caa', '#23b5ba', '#a4c100'],
		[],
	);

	const countryAxis = useMemo<CountryFoodChartProps['axisBottom']>(
		() => ({
			format: (value: ChartDataCountry) => countryName.of(value),
		}),
		[],
	);

	useEffect(() => {
		loadCommentThreads();
	}, [loadCommentThreads]);

	return (
		<BarChart
			data={chartData}
			indexBy='country'
			keys={features}
			colors={colors}
			barComponent={CountryFoodChartItem}
			axisBottom={countryAxis}
		/>
	);
};
