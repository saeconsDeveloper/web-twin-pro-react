import { z } from 'zod';
import { ReactNode, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';

interface TMethodsProps {
	initialValues?: any;
	schema: any;
}
interface TFormProps {
	onSubmit: SubmitHandler<FieldValues>;
	children: ReactNode;
	formId?: string;
}

export default function useRHForm({ initialValues, schema }: TMethodsProps) {
	type ValidationSchema = z.infer<typeof schema>;
	const methods = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: 'all',
		defaultValues: initialValues,
	});
	const Form = useMemo(() => {
		const FormComponent = ({ formId, children, onSubmit }: TFormProps) => (
			<FormProvider {...methods}>
				<form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
					{children}
				</form>
			</FormProvider>
		);
		return FormComponent;
	}, [methods]);

	return {
		methods,
		Form,
	};
}
