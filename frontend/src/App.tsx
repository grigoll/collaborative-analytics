import { ErrorBoundary } from 'react-error-boundary';
import { ChakraProvider } from '@chakra-ui/react';
import { Redirect, Route, Switch } from 'wouter';

import { RoutePaths } from './constants';
import { ErrorGlobalFallback } from './modules/error/global-fallback.component';
import { ErrorGlobalMonitor } from './modules/error/global-monitor.component';
import { HomePage } from './pages/home';
import { SharedPage } from './pages/shared';
import { ChartApiClientProvider } from './providers/chart-api-client.provider';
import { HttpClientProvider } from './providers/http-client.provider';
import { MonitoringProvider } from './providers/monitoring.provider';

const Router = () => (
	<Switch>
		<Route path={RoutePaths.Shared} component={SharedPage} />
		<Route path={RoutePaths.Root} component={HomePage} />

		{/* To keep it simple we direct every unknown route to home.
			In production we'd have 404 page or similar for invalid routes. */}
		<Redirect to={RoutePaths.Root} />
	</Switch>
);

const App = () => (
	<ErrorBoundary FallbackComponent={ErrorGlobalFallback}>
		<MonitoringProvider>
			<ErrorGlobalMonitor />

			<HttpClientProvider>
				<ChartApiClientProvider>
					<ChakraProvider>
						<Router />
					</ChakraProvider>
				</ChartApiClientProvider>
			</HttpClientProvider>
		</MonitoringProvider>
	</ErrorBoundary>
);

export default App;
