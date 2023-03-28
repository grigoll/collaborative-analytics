import { ChartDataPoint, ChartDataPointKey } from '@/types/chart';

export const computeChartDataPointKey = (point: ChartDataPoint): ChartDataPointKey =>
	`${point.country}:${point.feature}`;
