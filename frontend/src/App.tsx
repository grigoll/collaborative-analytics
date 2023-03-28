import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { CountryFoodChartContainer } from './modules/chart/country-food/component';
import { ErrorGlobalBoundary } from './modules/error/global-boundary.component';
import { ChartApiClientProvider } from './providers/chart-api-client.provider';
import { HttpClientProvider } from './providers/http-client.provider';
import { MonitoringProvider } from './providers/monitoring.provider';

const App = () => (
	<ErrorGlobalBoundary>
		<Suspense fallback={<div>Loading ................</div>}>
			<CountryFoodChartContainer />
		</Suspense>
	</ErrorGlobalBoundary>
);

const Shell = () => (
	<MonitoringProvider>
		<HttpClientProvider>
			<ChartApiClientProvider>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</ChartApiClientProvider>
		</HttpClientProvider>
	</MonitoringProvider>
);

export default Shell;
