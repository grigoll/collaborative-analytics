export class HttpError extends Error {
	constructor(...args: Parameters<ErrorConstructor>) {
		super(...args);
		this.name = 'HttpError';
	}
}
