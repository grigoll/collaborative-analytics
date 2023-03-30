export class HttpError extends Error {
	constructor(public code: number, ...args: Parameters<ErrorConstructor>) {
		super(...args);
		this.name = 'HttpError';
	}
}

export class InvalidTokenError extends TypeError {
	constructor(...args: Parameters<TypeErrorConstructor>) {
		super(...args);
		this.name = 'InvalidTokenError';
	}
}

export class MissingTokenError extends TypeError {
	constructor(...args: Parameters<TypeErrorConstructor>) {
		super(...args);
		this.name = 'MissingTokenError';
	}
}
