import { Controller } from 'react-hook-form';
import { Label, ErrorLabel } from '../atomic';

interface TControlledField {
	id?: string;
	name: string;
	label?: string;
	control: any;
	errors?: any;
	required?: boolean;
	rules?: any;
	Component: any;
	componentProps?: any;
	className?: string;
}

export default function ControlledField({
	id,
	name,
	label,
	control,
	errors,
	required,
	rules,
	Component,
	componentProps,
	className
}: TControlledField) {
	const hasError = !!errors?.[name];
	const errorMsg = hasError ? errors[name].message : '';
	return (
		<div className='flex flex-col' data-test-id={`${name}-controlled-wrapper`}>
			{label && (
				<Label id={id || name} required={required}>
					{label}
				</Label>
			)}
			<Controller
				name={name}
				control={control}
				rules={rules}
				
				render={({ field }) => {
					return (
						<Component
							data-test-id={`${name}-test-field`}
							{...field}
							{...componentProps}
							className={className}
						/>
					);
				}}
			/>
			{hasError && <ErrorLabel>{errorMsg}</ErrorLabel>}
		</div>
	);
}
