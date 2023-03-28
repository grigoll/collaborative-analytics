import { useCallback, useMemo } from 'react';
import { AxisProps } from '@nivo/axes';
import { BarDatum, BarSvgProps, LegendLabelDatum, ResponsiveBar } from '@nivo/bar';
import { capitalize } from '@/utils/string';

export type BarChartProps<T extends BarDatum> = Pick<
	BarSvgProps<T>,
	'data' | 'keys' | 'indexBy' | 'barComponent' | 'colors' | 'axisBottom' | 'axisLeft'
>;

export const BarChart = <T extends BarDatum>({
	data,
	keys,
	indexBy,
	colors,
	barComponent,
	axisLeft: _axisLeft,
	axisBottom: _axisBottom,
}: BarChartProps<T>) => {
	const axisCommon = useMemo<AxisProps>(() => ({ tickSize: 0, tickPadding: 10 }), []);

	const axisLeft = useMemo<BarSvgProps<T>['axisLeft']>(
		() => ({ ...axisCommon, ..._axisLeft }),
		[_axisLeft, axisCommon],
	);

	const axisBottom = useMemo<BarSvgProps<T>['axisBottom']>(
		() => ({ ...axisCommon, ..._axisBottom }),
		[_axisBottom, axisCommon],
	);

	const margin = useMemo<BarSvgProps<T>['margin']>(
		() => ({
			top: 50,
			bottom: 100,
			right: 50,
			left: 50,
		}),
		[],
	);

	const borderColor = useMemo<BarSvgProps<T>['borderColor']>(
		() => ({
			from: 'color',
			modifiers: [['opacity', 0.5]],
		}),
		[],
	);

	const legendLabel = useCallback(({ id }: LegendLabelDatum<T>) => capitalize(`${id}`), []);

	const legends = useMemo<BarSvgProps<T>['legends']>(
		() => [
			{
				dataFrom: 'keys',
				anchor: 'bottom',
				direction: 'row',
				translateY: 60,
				itemHeight: 20,
				itemWidth: 80,
				itemsSpacing: 10,
				symbolSize: 15,
				symbolShape: 'circle',
			},
		],
		[],
	);

	return (
		<ResponsiveBar
			{...{
				data,
				keys,
				indexBy,
				barComponent,
				margin,
				colors,
				legendLabel,
				legends,
				borderColor,
				axisLeft,
				axisBottom,
			}}
			borderRadius={1}
			borderWidth={1}
			padding={0.3}
			labelSkipWidth={20}
			labelSkipHeight={15}
			role='application'
		/>
	);
};
