import { API_URL_BASE } from '@/config';

import { HttpClientImpl } from './client';

export const httpClient = new HttpClientImpl(API_URL_BASE);
