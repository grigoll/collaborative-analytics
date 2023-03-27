export const hasJsonContentType = (response: Response): boolean =>
	response.headers.get('content-type')?.includes('application/json') ?? false;
