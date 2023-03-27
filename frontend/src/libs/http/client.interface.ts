import type { HttpVerbOptions } from './types';

export interface HttpClient {
	get: <R>(url: string, opts?: HttpVerbOptions) => Promise<R>;
	post: <R>(url: string, opts?: HttpVerbOptions) => Promise<R>;
}
