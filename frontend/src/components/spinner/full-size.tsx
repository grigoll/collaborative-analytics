import { FC } from 'react';
import { Center, CenterProps, Spinner } from '@chakra-ui/react';

export const SpinnerFullSize: FC<CenterProps> = ({ ...props }) => (
	<Center h='100%' w='100%' {...props}>
		<Spinner colorScheme='messenger' />
	</Center>
);
