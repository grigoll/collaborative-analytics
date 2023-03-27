import { httpClient } from '../http/shared';
import { ChartApiClientImpl } from './chart-client';

export const chartApiClient = new ChartApiClientImpl(httpClient);
