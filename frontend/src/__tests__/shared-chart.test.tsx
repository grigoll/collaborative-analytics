import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { render, screen } from '@testing-library/react';
import { ErrorGlobalFallback } from '@/modules/error/global-fallback.component';
import { SharedPage } from '@/pages/shared';
import { InvalidTokenError, MissingTokenError } from '@/types/error';

describe('shared page component', () => {
	test('throw error when rendering page without token parameter ', () => {
		expect(() => render(<SharedPage params={{ token: '' }} />)).toThrow(MissingTokenError);
	});
});

describe('global error boundary', () => {
	test('throw error and show missing token message', async () => {
		const { tokenMissingMsgEl, tokenInvalidMsgEl } = setup(MissingTokenError);

		expect(tokenMissingMsgEl).not.toBeNull();
		expect(tokenInvalidMsgEl).toBeNull();
	});

	test('throw error and show invalid token message', async () => {
		const { tokenInvalidMsgEl, tokenMissingMsgEl } = setup(InvalidTokenError);

		expect(tokenInvalidMsgEl).not.toBeNull();
		expect(tokenMissingMsgEl).toBeNull();
	});
});

const setup = (ErrConstructor: typeof MissingTokenError | typeof InvalidTokenError) => {
	const BombComponent: FC<{ Err: typeof ErrConstructor }> = ({ Err }) => {
		throw new Err();
	};

	const utils = render(
		<ErrorBoundary FallbackComponent={ErrorGlobalFallback}>
			<BombComponent Err={ErrConstructor} />
		</ErrorBoundary>,
	);

	const tokenMissingMsgEl = screen.queryByText(/token(.*)missing/i);
	const tokenInvalidMsgEl = screen.queryByText(/token(.*)invalid/i);

	return {
		tokenMissingMsgEl,
		tokenInvalidMsgEl,
		...utils,
	};
};
