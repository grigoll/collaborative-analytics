import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { ChartLayout } from '@/components/layout/chart.component';
import { PageLayout } from '@/components/layout/page.component';
import { SpinnerFullSize } from '@/components/spinner/full-size';
import { CountryFoodChartContainer } from '@/modules/chart/country-food/container.component';
import { CommentThreadContainer } from '@/modules/comments/thread.component';
import { useGlobalStore } from '@/store/chart.store';
import { actionSelectors } from '@/store/selectors';
import { MissingTokenError } from '@/types/error';

export const SharedPage: FC<RouteComponentProps<{ token: string }>> = ({ params: { token } }) => {
	const saveToken = useGlobalStore(actionSelectors.saveToken);
	const [isBootstrapped, setIsBootstrapped] = useState(false);

	useEffect(() => {
		(async () => {
			await saveToken(token);
			setIsBootstrapped(true);
		})();
	}, [saveToken, token]);

	if (!token) {
		throw new MissingTokenError();
	}

	if (!isBootstrapped) {
		return <SpinnerFullSize />;
	}

	return (
		<PageLayout>
			<ChartLayout>
				<CountryFoodChartContainer />
			</ChartLayout>

			<CommentThreadContainer />
		</PageLayout>
	);
};
