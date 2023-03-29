import { FC } from 'react';
import { Avatar, Flex, SlideFade, SpaceProps, Text } from '@chakra-ui/react';
import { getRandomImageLink } from '@/utils';

type CommentListItemProps = SpaceProps & {
	name: string;
	text: string;
};

export const CommentListItem: FC<CommentListItemProps> = ({ name, text, ...props }) => (
	<Flex as={SlideFade} in width='100%' justify='center' direction='column' {...props}>
		<Flex align='center'>
			<Flex h='32px' w='32px' justify='center' align='center'>
				<Avatar name={name} src={getRandomImageLink(name)} size='sm' />
			</Flex>

			<Text
				ml={2}
				fontSize='xl'
				maxW='100%'
				whiteSpace='nowrap'
				textOverflow='ellipsis'
				overflow='hidden'
				title={name}>
				{name}
			</Text>
		</Flex>

		<Text mt={4}>{text}</Text>
	</Flex>
);
