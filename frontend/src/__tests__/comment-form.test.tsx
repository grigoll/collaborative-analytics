import { fireEvent, render, screen } from '@testing-library/react';
import { CommentForm } from '@/components/comment/form.component';

describe('comment form', () => {
	test('fill in inputs and submit', async () => {
		const { submitHandler, nameInput, commentInput, submitBtn } = setup();

		const user = 'grigol';
		fireEvent.change(nameInput, { target: { value: user } });
		expect(nameInput).toHaveValue(user);

		const comment = `very cool app`;
		fireEvent.change(commentInput, { target: { value: comment } });
		expect(commentInput).toHaveValue(comment);

		fireEvent.click(submitBtn);
		expect(submitHandler).toHaveBeenCalledWith(comment, user);
	});

	test('disable submit button if any of the fields are empty', async () => {
		const { nameInput, commentInput, submitBtn } = setup();

		expect(nameInput).not.toHaveValue();
		expect(commentInput).not.toHaveValue();
		expect(submitBtn).toBeDisabled();
	});

	test('enable submit button after the fields are filled in', async () => {
		const { nameInput, commentInput, submitBtn } = setup();

		expect(submitBtn).toBeDisabled();

		fireEvent.change(nameInput, { target: { value: 'user' } });
		fireEvent.change(commentInput, { target: { value: 'comment' } });

		expect(submitBtn).not.toBeDisabled();
	});
});

const setup = () => {
	const submitHandler = jest.fn(() => {});

	const utils = render(<CommentForm onFormSubmit={submitHandler} submitLabel='Post' />);

	const submitBtn = screen.getByRole('button');
	const nameInput = screen.getByPlaceholderText(/name/i);
	const commentInput = screen.getByPlaceholderText(/tell us/i);

	return {
		submitHandler,
		nameInput,
		commentInput,
		submitBtn,
		...utils,
	};
};
