export const tryDescribeError = (error: unknown): string => {
	if (error instanceof Error) {
		return (
			`${error.name}: ${error.message}\n` +
			(error.stack ? `Stack: ${error.stack}\n` : '') +
			(error.cause ? `Cause: ${tryDescribeError(error.cause)}` : '')
		);
	}

	return `${error}`;
};
