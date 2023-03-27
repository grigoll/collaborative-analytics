import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: FC<FallbackProps> = ({ resetErrorBoundary }) => (
	<div>
		<p>Something went wrong</p>

		<button onClick={resetErrorBoundary}>Reload application</button>
	</div>
);
