import { BarDatum, BarItemProps, svgDefaultProps } from '@nivo/bar';

export type BarChartItemProps<T extends BarDatum> = BarItemProps<T>;

export const BarChartItem = svgDefaultProps.barComponent;
