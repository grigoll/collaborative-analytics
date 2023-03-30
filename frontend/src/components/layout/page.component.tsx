import { FC, PropsWithChildren } from 'react';
import { Box, Container } from '@chakra-ui/react';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
	<Box h='100vh' w='100vw' overflow='auto' bg='#f2f4fc'>
		<Container pt='6' pb='6' maxW='container.md'>
			{children}
		</Container>
	</Box>
);
