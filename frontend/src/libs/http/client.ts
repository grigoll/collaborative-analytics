import { HttpError } from '@/types/error';

import { HttpClient } from './client.interface';
import type { HttpRequestOptions } from './types';
import { hasJsonContentType } from './utils';

export class HttpClientImpl implements HttpClient {
	constructor(private baseUrl: string) {}

	get: HttpClient['get'] = (url, opts) => this.request(url, { method: 'GET', ...opts });

	post: HttpClient['post'] = (url, opts) => this.request(url, { method: 'POST', ...opts });

	private request = async <TReturn>(url: string, opts: HttpRequestOptions): Promise<TReturn> => {
		try {
			const { method, data, headers: _headers } = opts;

			// Since our BE always expects data in JSON we just keep it simple here and always send it as JSON
			const headers = data ? { 'content-type': 'application/json', ..._headers } : _headers;
			const body = JSON.stringify(data);

			const response = await fetch(`${this.baseUrl}${url}`, {
				method,
				headers,
				body,
			});

			if (!response.ok) {
				throw new HttpError(`${response.status}, response: ${await response.text()}`);
			}

			const result = hasJsonContentType(response)
				? await response.json()
				: await response.text();

			return result;
		} catch (error) {
			// Common exceptions could be handled here.
			// Like refreshing token, etc. Otherwise let the relevant place handle it

			throw error;
		}
	};
}
