import styled from 'styled-components';
import { UCIGold } from './Colors';

interface TypeProps {
	color?: string;
	centered?: boolean;
}

export const PageTitle = styled.h1`
	color: #fff;
	font-size: 3rem;
	text-align: center;
`;

export const Heading = styled.h1<TypeProps>`
	color: ${props => (props.color ? props.color : '#000')};
	font-size: 2rem;
	margin-bottom: 1.5rem;
	line-height: 3rem;
	text-align: ${props => (props.centered ? 'center' : 'left')};

	> * {
		display: inline;
	}

	@media screen and (max-width: 850px) {
		> * {
			font-size: 1.5rem;
		}
	}
`;

export const SectionHeader = styled.h2``;

interface TextProps {
	indented?: boolean;
}

export const Text = styled.p<TextProps>`
	line-height: 1.5rem;
	${props => props.indented && 'margin-left: 1.5em;'}
`;

export const SmallHeader = styled.h3`
	font-weight: 700;
	color: ${UCIGold};
`;
