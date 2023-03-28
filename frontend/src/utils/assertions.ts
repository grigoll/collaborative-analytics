export const assertContextValue = <T>(value: T, hook: string, provider: string) => {
	if (!value) {
		throw new Error(`${hook} cannot be used outside of ${provider}`);
	}

	return value;
};
