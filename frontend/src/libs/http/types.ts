// In real-word use case we'd have more options but keeping it lean here
export type HttpVerbOptions = {
	headers?: Record<string, string>;

	// For simplicity request data is assumed to always be JSON across this project
	data?: Record<string, unknown>;
};

export type HttpRequestOptions = HttpVerbOptions & {
	method?: string;
};
