import { FC, useEffect } from 'react';
import { SpinnerFullSize } from '@/components/spinner/full-size';
import { useGlobalStore } from '@/store/chart.store';
import { actionSelectors, stateSelectors } from '@/store/selectors';

import { CountryFoodChart } from './chart.component';

export const CountryFoodChartContainer: FC = () => {
	const loadChart = useGlobalStore(actionSelectors.loadChart);

	const data = useGlobalStore(stateSelectors.chartData);

	useEffect(() => {
		loadChart();
	}, [loadChart]);

	return data.length > 0 ? <CountryFoodChart data={data} /> : <SpinnerFullSize />;
};
