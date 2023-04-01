import { Container, Fade, Text } from '@chakra-ui/react';
import { useGlobalStore } from '@/store/chart.store';
import { stateSelectors } from '@/store/selectors';
import { capitalize, countryName, threadKeyToChartDataPoint } from '@/utils';

import { CommentListContainer } from './list-container.component';
import { CommentThreadReply } from './thread-reply.component';

export const CommentThreadContainer = () => {
	const threadKey = useGlobalStore(stateSelectors.activeThreadKey);
	const isReadOnly = useGlobalStore(stateSelectors.isReadonlyMode);

	const { country = '', feature = '' } = threadKey ? threadKeyToChartDataPoint(threadKey) : {};

	return (
		<Container in={Boolean(threadKey)} unmountOnExit as={Fade} minW={460} pt='3'>
			<Text fontSize='lg' textAlign='center'>
				{countryName.of(country)} - {capitalize(feature)}
			</Text>

			<CommentListContainer mt={3} />

			{!isReadOnly && <CommentThreadReply />}
		</Container>
	);
};
