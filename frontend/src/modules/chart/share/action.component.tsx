import { useCallback, useState } from 'react';
import { LinkIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useClipboard } from '@chakra-ui/react';
import { SITE_URL } from '@/config';
import { useChartApiClient } from '@/providers/chart-api-client.provider';
import { sleep } from '@/utils';

export const ChartShareAction = () => {
	const chartApi = useChartApiClient();

	const [loading, setLoading] = useState(false);
	const { onCopy, hasCopied, setValue, value } = useClipboard('');

	const generateLink = useCallback(async () => {
		setLoading(true);

		const [{ token }] = await Promise.all([
			chartApi.getChartShareable(),
			sleep(200), // for UX
		]);

		setValue(`${SITE_URL}/shared/${token}`);
		setLoading(false);
	}, [chartApi, setValue]);

	const label = value ? (hasCopied ? 'Copied' : 'Copy share link') : 'Generate share link';

	return (
		<Tooltip closeDelay={hasCopied ? 1000 : undefined} closeOnClick={false} label={label}>
			<IconButton
				icon={<LinkIcon />}
				onClick={value ? onCopy : generateLink}
				isLoading={loading}
				size='sm'
				colorScheme='messenger'
				position='absolute'
				bottom='10px'
				right='10px'
				aria-label='Share chart'
			/>
		</Tooltip>
	);
};
