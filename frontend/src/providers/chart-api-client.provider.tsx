import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { ChartApiClient } from '@/libs/api/chart-client.interface';
import { chartApiClient } from '@/libs/api/shared';
import { assertContextValue } from '@/utils';

const ctx = createContext<ChartApiClient | null>(null);

export const useChartApiClient = () => {
	const value = useContext(ctx);

	return assertContextValue(value, 'useChartApiClient', 'ChartApiClientProvider');
};

export const ChartApiClientProvider: FC<PropsWithChildren<{ value?: ChartApiClient }>> = ({
	value = chartApiClient,
	children,
}) => <ctx.Provider value={value}>{children}</ctx.Provider>;
