import { FC } from 'react';
import {
	BackgroundProps,
	BorderProps,
	EffectProps,
	SpaceProps,
	StackDivider,
	VStack,
} from '@chakra-ui/react';
import { TestId } from '@/constants';
import { ChartComment } from '@/types/chart';
import { getTestIdProp } from '@/utils';

import { CommentListItem } from './list-item.component';

type CommentListProps = SpaceProps &
	BorderProps &
	EffectProps &
	BackgroundProps & {
		items: ChartComment[];
	};

export const CommentList: FC<CommentListProps> = ({ items, ...rootProps }) => (
	<VStack divider={<StackDivider />} {...rootProps}>
		{items.map(({ userName, text }, idx) => (
			<CommentListItem
				key={`${userName}-${idx}`}
				name={userName}
				text={text}
				px={5}
				py={3}
				{...getTestIdProp(TestId.CommentThread.Item)}
			/>
		))}
	</VStack>
);
