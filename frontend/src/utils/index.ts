import {
	ChartDataCountry,
	ChartDataFeature,
	ChartDataPoint,
	ChartDataPointKey,
} from '@/types/chart';
import { HttpError, InvalidTokenError, MissingTokenError } from '@/types/error';

/**
 * There are mix of different purpose functions but
 * for simplicity they're kept in a single file
 */

export const assertContextValue = <T>(value: T, hook: string, provider: string) => {
	if (!value) {
		throw new Error(`${hook} cannot be used outside of ${provider}`);
	}

	return value;
};

export const chartDataPointToThreadKey = (point: ChartDataPoint): ChartDataPointKey =>
	`${point.country}:${point.feature}`;

export const threadKeyToChartDataPoint = (key: ChartDataPointKey): ChartDataPoint => {
	const keys = key.split(':');
	const country = keys[0] as ChartDataCountry;
	const feature = keys[1] as ChartDataFeature;

	return { country, feature };
};

export const describeError = (error: unknown): string => {
	if (error instanceof Error) {
		return (
			`${error}` +
			(error.stack ? `\nStack: ${error.stack}` : '') +
			(error.cause ? `\n\nCause: ${describeError(error.cause)}` : '')
		);
	}

	return `${error}`;
};

export const errorToFriendlyMessage = (error: unknown): string => {
	if (error instanceof MissingTokenError) {
		return 'The token is missing. Please make sure the link is correct.';
	}

	if (error instanceof InvalidTokenError) {
		return 'The token is invalid. Please make sure the link is correct.';
	}

	if (
		error instanceof HttpError ||
		(error instanceof Error && `${error}`.toLowerCase().includes('to fetch'))
	) {
		return 'Network error occurred';
	}

	return 'Something went wrong 😕';
};

/**
 * Map country Alpha code to name
 * @example GE - Germany
 */
export const countryName = new Intl.DisplayNames('en', { type: 'region' });

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getRandomImageLink = (seed: string) =>
	`https://api.dicebear.com/6.x/open-peeps/png?radius=50&backgroundColor=transparent&size=32&seed=${seed}`;

export const getTestIdProp = (id: string) => ({ 'data-testid': id });
