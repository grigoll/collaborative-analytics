import { FC, memo } from 'react';
import { Box, Center, Flex, Square, Text } from '@chakra-ui/react';
import { BarTooltipProps } from '@nivo/bar';
import { useGlobalStore } from '@/store/chart.store';
import { stateSelectors } from '@/store/selectors';
import { ChartDataCountry, ChartDataFeature, ChartDataItem } from '@/types/chart';
import { capitalize, chartDataPointToThreadKey, countryName } from '@/utils';

export const CountryFoodChartTooltip: FC<BarTooltipProps<ChartDataItem>> = memo(
	({ id, indexValue, color, formattedValue }) => {
		const countryCode = indexValue as ChartDataCountry;
		const feature = id as ChartDataFeature;
		const key = chartDataPointToThreadKey({ country: countryCode, feature });

		const commentsCount = useGlobalStore((s) => stateSelectors.commentsCount(s, key));

		return (
			<Box p='2' bg='#fff' borderRadius='4' shadow='1px 1px 5px 0 gray'>
				<Flex>
					<Flex direction='column'>
						<Text fontSize='sm'>{countryName.of(countryCode)}</Text>

						<Flex align='center'>
							<Square borderRadius='50%' size='10px' mr='1' bg={color} />
							<Text fontSize='sm'>{capitalize(feature)}</Text>
						</Flex>
					</Flex>

					<Center flex='1' ml='3'>
						<Text fontSize='sm'>{formattedValue}</Text>
					</Center>
				</Flex>

				<Text fontSize='xs' mt='1'>
					{commentsCount || 'No'} comments
				</Text>

				<Text mt='1' fontSize='xx-small'>
					<em>Click to add comment</em>
				</Text>
			</Box>
		);
	},
);
CountryFoodChartTooltip.displayName = 'CountryFoodChartTooltip';
