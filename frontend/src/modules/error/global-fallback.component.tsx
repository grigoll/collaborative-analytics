import { FC, useMemo } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { errorToFriendlyMessage } from '@/utils';

export const ErrorGlobalFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
	// since it's topmost in the tree ui-kit styles won't work
	const rootStyle = useMemo(
		() =>
			({
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			} as const),
		[],
	);

	const textStyle = useMemo(() => ({ color: '#c00' } as const), []);

	const btnStyle = useMemo(
		() =>
			({
				all: 'unset',
				cursor: 'pointer',
				borderRadius: 6,
				background: '#0078ff',
				padding: '12px 16px',
				color: '#fff',
			} as const),
		[],
	);

	return (
		<div style={rootStyle}>
			<h3 style={textStyle}>{errorToFriendlyMessage(error)}</h3>

			<button style={btnStyle} onClick={resetErrorBoundary}>
				Reload
			</button>
		</div>
	);
};
