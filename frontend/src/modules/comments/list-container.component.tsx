import { FC, useEffect } from 'react';
import { SpaceProps } from '@chakra-ui/react';
import { CommentList } from '@/components/comment/list.component';
import { CommentListEmpty } from '@/components/comment/list-empty.component';
import { TestId } from '@/constants';
import { useGlobalStore } from '@/store/chart.store';
import { actionSelectors, stateSelectors } from '@/store/selectors';
import { getTestIdProp } from '@/utils';

export const CommentListContainer: FC<SpaceProps> = (props) => {
	const loadComments = useGlobalStore(actionSelectors.loadComments);

	const threadKey = useGlobalStore(stateSelectors.activeThreadKey);
	const comments = useGlobalStore(stateSelectors.activeThreadComments);
	const commentsLoading = useGlobalStore(stateSelectors.activeThreadCommentsLoading);

	useEffect(() => {
		threadKey && loadComments(threadKey);
	}, [threadKey, loadComments]);

	return comments?.length ? (
		<CommentList
			items={comments}
			shadow='md'
			borderRadius={6}
			bg='#fff'
			{...props}
			{...getTestIdProp(TestId.CommentThread.List)}
		/>
	) : (
		<CommentListEmpty loading={commentsLoading} h={100} width='100%' bg='#fff' {...props} />
	);
};
