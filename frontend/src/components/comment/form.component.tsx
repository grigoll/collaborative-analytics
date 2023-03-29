import { FC, FormEvent, useCallback } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
	Button,
	Card,
	CardBody,
	chakra,
	EffectProps,
	FormControl,
	Input,
	SpaceProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTextInputControl } from '@/hooks/use-input-control';

type CommentFormProps = SpaceProps &
	EffectProps & {
		onFormSubmit: (text: string, user: string) => void;
		submitLabel: string;
		disableSubmit?: boolean;
		submitLoading?: boolean;
	};

export const CommentForm: FC<CommentFormProps> = ({
	onFormSubmit,
	submitLabel,
	disableSubmit,
	submitLoading,
	...rootProps
}) => {
	const [text, onTextChange, resetTextInput] = useTextInputControl('');
	const [userName, onNameChange] = useTextInputControl('');

	const handleFormSubmit = useCallback(
		(evt: FormEvent<HTMLFormElement>) => {
			evt.preventDefault();
			onFormSubmit(text, userName);
			resetTextInput();
		},
		[onFormSubmit, resetTextInput, text, userName],
	);

	return (
		<Card as={motion.div} layout {...rootProps}>
			<CardBody>
				<chakra.form onSubmit={handleFormSubmit} display='flex' flexDirection='column'>
					<FormControl isRequired>
						<Input placeholder='Your name' value={userName} onChange={onNameChange} />
					</FormControl>

					<FormControl isRequired mt={3}>
						<Input
							placeholder='Tell us what you think'
							value={text}
							onChange={onTextChange}
						/>
					</FormControl>

					<Button
						type='submit' // to enable submit with keyboard
						mt={3}
						w={200}
						alignSelf='center'
						size='sm'
						colorScheme='messenger'
						isLoading={submitLoading}
						isDisabled={disableSubmit || !text || !userName}
						rightIcon={<ArrowForwardIcon />}>
						{submitLabel}
					</Button>
				</chakra.form>
			</CardBody>
		</Card>
	);
};
