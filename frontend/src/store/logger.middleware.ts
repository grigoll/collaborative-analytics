import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { logger } from '@/libs/logger';

/**
 * For details
 * @see https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#middleware-that-doesnt-change-the-store-type
 */

type LoggerMiddleware = <
	T,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
	f: StateCreator<T, Mps, Mcs>,
	name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerMiddlewareImpl = <T>(
	f: StateCreator<T, [], []>,
	name?: string,
) => StateCreator<T, [], []>;

const storeLoggerMiddleware: LoggerMiddlewareImpl = (f) => (set, get, store) => {
	const loggedSet: typeof set = (...args) => {
		set(...args);
		logger.debug('[Store]', get());
	};

	store.setState = loggedSet;

	return f(loggedSet, get, store);
};

export const storeLogger = storeLoggerMiddleware as unknown as LoggerMiddleware;
