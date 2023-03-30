import { FC } from 'react';
import { ChartLayout } from '@/components/layout/chart.component';
import { PageLayout } from '@/components/layout/page.component';
import { CountryFoodChartContainer } from '@/modules/chart/country-food/container.component';
import { ChartShareAction } from '@/modules/chart/share/action.component';
import { ShareActionLayout } from '@/modules/chart/share/layout.component';
import { CommentThreadContainer } from '@/modules/comments/thread.component';

export const HomePage: FC = () => (
	<PageLayout>
		<ChartLayout>
			<ShareActionLayout>
				<CountryFoodChartContainer />

				<ChartShareAction />
			</ShareActionLayout>
		</ChartLayout>

		<CommentThreadContainer />
	</PageLayout>
);
