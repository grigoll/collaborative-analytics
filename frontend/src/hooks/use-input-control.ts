import { ChangeEvent, useCallback, useState } from 'react';

type ValueInputElement = {
	value: string;
};

export const useTextInputControl = <
	E extends ValueInputElement,
	T extends string,
	Event extends ChangeEvent<E> = ChangeEvent<E>,
>(
	initialValue: T,
): [T, (evt: Event) => void, () => void] => {
	const [value, setValue] = useState(initialValue);

	const onChange = useCallback((evt: Event) => evt.target && setValue(evt.target.value as T), []);

	const reset = useCallback(() => setValue(initialValue), [initialValue]);

	return [value, onChange, reset];
};
