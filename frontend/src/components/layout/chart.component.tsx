import { FC, PropsWithChildren } from 'react';
import { AspectRatio, Fade } from '@chakra-ui/react';

export const ChartLayout: FC<PropsWithChildren> = ({ children }) => (
	<AspectRatio in as={Fade} ratio={4 / 3} minW={500} borderRadius={6} borderWidth={1} bg='#fff'>
		{children}
	</AspectRatio>
);
