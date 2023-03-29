import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { HttpClient } from '@/libs/http/client.interface';
import { httpClient } from '@/libs/http/shared';
import { assertContextValue } from '@/utils';

const ctx = createContext<HttpClient | null>(null);

export const useHttpClient = () => {
	const value = useContext(ctx);

	return assertContextValue(value, 'useHttpClient', 'HttpClientProvider');
};

export const HttpClientProvider: FC<PropsWithChildren<{ value?: HttpClient }>> = ({
	value = httpClient,
	children,
}) => <ctx.Provider value={value}>{children}</ctx.Provider>;
