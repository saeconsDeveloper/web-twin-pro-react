import { memo } from 'react';
import styled from 'styled-components';

interface LabelProps {
	id?: string;
	children: React.ReactNode;
	required?: boolean;
}

export const StyledLabel = styled.label`
font-size: 0.725rem;
text-transform: uppercase;
letter-spacing: 1.2px;
color: rgba(147, 159, 173, 0.84);
line-height: 0.9375rem;
margin-bottom: 0.5rem;
font-weight: 700;
`;

const Label = ({ id = 'id', children, required = false }: LabelProps) => {
	return (
		<StyledLabel
			htmlFor={id}
			data-test-id={`${id}-test-label`}
		>
			{children}
			{required && <span className='text-error'>*</span>}
		</StyledLabel>
	);
};

export default memo(Label);
