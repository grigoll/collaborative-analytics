import { FC } from 'react';
import {
	BackgroundProps,
	Card,
	CardBody,
	LayoutProps,
	SlideFade,
	SpaceProps,
	Text,
} from '@chakra-ui/react';
import { SpinnerFullSize } from '@/components/spinner/full-size';
import { TestId } from '@/constants';
import { getTestIdProp } from '@/utils';

type CommentListEmptyProps = LayoutProps &
	SpaceProps &
	BackgroundProps & {
		loading?: boolean;
	};

export const CommentListEmpty: FC<CommentListEmptyProps> = ({ loading, ...props }) => (
	<Card as={SlideFade} in {...props}>
		<CardBody>
			{loading ? (
				<SpinnerFullSize {...getTestIdProp(TestId.CommentThread.Placeholder.Loader)} />
			) : (
				<>
					<Text
						mb={2}
						fontSize='md'
						{...getTestIdProp(TestId.CommentThread.Placeholder.EmptyMessage)}>
						No comments yet
					</Text>

					<Text fontSize='sm'>{`We'd love to hear your thoughts 🤩`}</Text>
				</>
			)}
		</CardBody>
	</Card>
);
