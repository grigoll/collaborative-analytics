import { FC, useCallback, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useMonitoring } from '@/providers/monitoring.provider';
import { describeError } from '@/utils';

export const ErrorGlobalMonitor: FC = () => {
	const monitor = useMonitoring();
	const { showBoundary } = useErrorBoundary();

	const handleError = useCallback(
		(evt: ErrorEvent) => {
			monitor.error(`(GlobalErrorBoundary) Unhandled error. ${describeError(evt.error)}`);
			showBoundary(evt.error);
		},
		[monitor, showBoundary],
	);

	const handleRejection = useCallback(
		(evt: PromiseRejectionEvent) => {
			monitor.error(
				`(GlobalErrorBoundary) Unhandled rejection. ${describeError(evt.reason)}`,
			);
			showBoundary(evt.reason);
		},
		[monitor, showBoundary],
	);

	useEffect(() => {
		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleRejection);
		};
	}, [handleError, handleRejection]);

	return null;
};
