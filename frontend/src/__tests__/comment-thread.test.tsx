import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { TestId } from '@/constants';
import { CommentThreadContainer } from '@/modules/comments/thread.component';
import { useGlobalStore } from '@/store/chart.store';

/**
 * Right now these tests are making real API calls to BE,
 * but for production app ideally we'd use e.g. MSW (Mock Service Worker)
 * that'd help us intercept network requests and run tests in isolation without BE dependency.
 */
describe('displays comment thread', () => {
	beforeEach(async () => {
		await prepareStore();
	});

	test('displays empty comment thread', async () => {
		await selectCommentThread('IT:hotdog');
		await setup();

		const noCommentsMsg = screen.queryByText(/no comment/i);
		expect(noCommentsMsg).not.toBeNull();
	});

	test('adds comment to the thread', async () => {
		await selectCommentThread('FR:kebab');
		await setup();

		const submitBtn = screen.getByRole('button');
		const nameInput = screen.getByPlaceholderText(/name/i);
		const commentInput = screen.getByPlaceholderText(/tell us/i);

		const name = 'arbitrary long name';
		const comment = 'some random message to tell';
		fireEvent.change(nameInput, { target: { value: name } });
		fireEvent.change(commentInput, { target: { value: comment } });

		const prevCommentElements = queryAllCommentElements();

		fireEvent.click(submitBtn);

		await waitFor(commentsToIncreaseByOne(prevCommentElements.length));

		const commentElements = queryAllCommentElements();

		const recentCommentElement = commentElements.at(-1);
		expect(recentCommentElement).toBeDefined();
		expect(getByText(recentCommentElement!, name)).toBeDefined();
		expect(getByText(recentCommentElement!, comment)).toBeDefined();
	});
});

const setup = async () => {
	const utils = render(<CommentThreadContainer />);

	await waitFor(commentsToLoad);

	return utils;
};

const prepareStore = () => useGlobalStore.getState().loadChart();

const selectCommentThread = useGlobalStore.getState().showCommentThread;

const queryAllCommentElements = () => screen.queryAllByTestId(TestId.CommentThread.Item);

// `waitFor` callbacks
const commentsToLoad = () =>
	expect(screen.queryByTestId(TestId.CommentThread.Placeholder.Loader)).toBeNull();

const commentsToIncreaseByOne = (prevCount: number) => () =>
	expect(queryAllCommentElements().length).toBe(prevCount + 1);
