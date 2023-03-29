import { HttpClient } from '../http/client.interface';
import { ChartApiClient } from './chart-client.interface';

export class ChartApiClientImpl implements ChartApiClient {
	constructor(private http: HttpClient) {}

	getChartData: ChartApiClient['getChartData'] = () => this.http.get('/chart/data');

	/**
	 * Get existing comment threads
	 * @returns comment threads (each includes only metadata, no comments)
	 */
	getCommentThreads: ChartApiClient['getCommentThreads'] = () =>
		this.http.get('/chart/comment_threads');

	/**
	 * Get comment thread
	 * @returns comment thread with metadata and comments)
	 */
	getCommentThread: ChartApiClient['getCommentThread'] = (threadId, opts) =>
		this.http.get(`/chart/comment_threads/${threadId}`, opts);

	createCommentThread: ChartApiClient['createCommentThread'] = (data) =>
		this.http.post('/chart/comment_threads', { data });

	respondToCommentThread: ChartApiClient['respondToCommentThread'] = (threadId, data) =>
		this.http.post(`/chart/comment_threads/${threadId}/respond`, {
			data,
		});

	getChartShareable: ChartApiClient['getChartShareable'] = () => this.http.get('/share');

	getSharedChartData: ChartApiClient['getSharedChartData'] = (identifier) =>
		this.http.get(`/chart/shared/${identifier}`);
}
