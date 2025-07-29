import { memo } from 'react';
import styled from 'styled-components';

const ErrorLabel = styled.p`
	margin-top: 4px;
	color: #db312b;
	font-size: '0.75rem';
	font-weight: 400;
	line-height: 12px;
	&:first-letter {
		text-transform: capitalize;
	}
`;

export default memo(ErrorLabel);
