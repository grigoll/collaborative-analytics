import { useCallback } from 'react';
import { CommentForm } from '@/components/comment/form.component';
import { useGlobalStore } from '@/store/chart.store';
import { actionSelectors, stateSelectors } from '@/store/selectors';

export const CommentThreadReply = () => {
	const postComment = useGlobalStore(actionSelectors.postComment);

	const commentCount = useGlobalStore(stateSelectors.activeThreadCommentCount);
	const commentsLoading = useGlobalStore(stateSelectors.activeThreadCommentsLoading);
	const postLoading = useGlobalStore(stateSelectors.postCommentLoading);

	const handleFormSubmit = useCallback(
		(text: string, userName: string) => postComment({ text, userName }),
		[postComment],
	);

	return (
		<CommentForm
			mt={3}
			shadow='lg'
			submitLoading={postLoading}
			disableSubmit={commentsLoading}
			submitLabel={commentCount ? 'Reply' : 'Post'}
			onFormSubmit={handleFormSubmit}
		/>
	);
};
