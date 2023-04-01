import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import copy from 'copy-to-clipboard';
import { ChartApiClient } from '@/libs/api/chart-client.interface';
import { ChartShareAction } from '@/modules/chart/share/action.component';
import { ChartApiClientProvider } from '@/providers/chart-api-client.provider';

jest.mock('copy-to-clipboard');

describe('chart share action', () => {
	test('generate share link', async () => {
		(copy as jest.Mock).mockReturnValue(true); // clipboard copy handler

		const { button, tooltip, apiMethod } = await setup();

		expect(tooltip).toHaveTextContent(/generate/i);
		fireEvent.click(button); // link start generation

		expect(apiMethod).toHaveBeenCalledTimes(1);

		await waitFor(() => expect(tooltip).toHaveTextContent(/copy/i)); // generation successful
		fireEvent.click(button); // copy

		expect(copy).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(tooltip).toHaveTextContent(/copied/i)); // copy successful
	});
});

const setup = async () => {
	const apiMethod: ChartApiClient['getChartShareable'] = jest.fn(async () => ({
		token: 'fake-token',
	}));

	const utils = render(
		<ChartApiClientProvider
			value={{ getChartShareable: apiMethod } as unknown as ChartApiClient}>
			<ChartShareAction />
		</ChartApiClientProvider>,
	);

	const button = screen.getByRole('button');
	fireEvent.pointerOver(button); // trigger tooltip

	const tooltip = await screen.findByRole('tooltip');

	return {
		button,
		tooltip,
		apiMethod,
		...utils,
	};
};
