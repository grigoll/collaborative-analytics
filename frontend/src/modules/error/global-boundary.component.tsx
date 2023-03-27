import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useMonitoring } from '@/providers/monitoring.provider';
import { tryDescribeError } from '@/utils/error';

import { ErrorFallback } from './global-fallback.component';

export const ErrorGlobalBoundary: FC<PropsWithChildren> = ({ children }) => {
	const monitor = useMonitoring();

	const handleError = useCallback(
		(ev: ErrorEvent) =>
			monitor.error('(GlobalErrorBoundary) Unhandled error', tryDescribeError(ev.error)),
		[monitor],
	);

	const handleRejection = useCallback(
		(ev: PromiseRejectionEvent) =>
			monitor.error(
				`(GlobalErrorBoundary) Unhandled promise rejection. Reason: ${ev.reason}`,
			),
		[monitor],
	);

	useEffect(() => {
		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleRejection);
		};
	}, [handleError, handleRejection]);

	return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};
