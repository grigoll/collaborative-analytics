import { FC, useMemo } from 'react';
import { BarChart, BarChartProps } from '@/components/bar-chart/component';
import { ChartDataCountry, ChartDataFeature, ChartDataItem } from '@/types/chart';
import { countryName } from '@/utils';

import { CountryFoodChartItem } from './item.component';

type CountryFoodChartProps = BarChartProps<ChartDataItem>;

type ComponentProps = {
	data: ChartDataItem[];
};

export const CountryFoodChart: FC<ComponentProps> = ({ data }) => {
	const features = useMemo<CountryFoodChartProps['keys']>(
		() => Object.values(ChartDataFeature),
		[],
	);

	const colors = useMemo<CountryFoodChartProps['colors']>(
		() => ['#238276', '#2A9D8F', '#8AB17D', '#B99067', '#E76F51', '#F4A261'],
		[],
	);

	const countryAxis = useMemo<CountryFoodChartProps['axisBottom']>(
		() => ({ format: (value: ChartDataCountry) => countryName.of(value) }),
		[],
	);

	const labelColor = useMemo<CountryFoodChartProps['labelTextColor']>(
		() => ({ from: 'color', modifiers: [['brighter', 3]] }),
		[],
	);

	return (
		<BarChart
			data={data}
			indexBy='country'
			keys={features}
			colors={colors}
			barComponent={CountryFoodChartItem}
			axisBottom={countryAxis}
			labelTextColor={labelColor}
		/>
	);
};
