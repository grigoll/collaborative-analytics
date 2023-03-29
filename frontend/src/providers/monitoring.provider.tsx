import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { Logger, logger } from '@/libs/logger';
import { assertContextValue } from '@/utils';

const ctx = createContext<Logger | null>(null);

export const useMonitoring = () => {
	const value = useContext(ctx);

	return assertContextValue(value, 'useMonitoring', 'MonitoringProvider');
};

export const MonitoringProvider: FC<PropsWithChildren<{ value?: Logger }>> = ({
	value = logger,
	children,
}) => <ctx.Provider value={value}>{children}</ctx.Provider>;
