import styled from 'styled-components';
import React from 'react';
import { UCBlue } from './Colors';

export const Select = styled.select`
	-webkit-appearance: none;
	-moz-appearance: none;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	width: 50%;
	border: 1px solid lightgray;

	@media screen and (max-width: 850px) {
		width: 20%;
	}
`;

export const Label = styled.label`
	color: gray;
`;

export const InputArea = styled.div``;

export const TextInput = styled.input`
	border-radius: 5px;
	padding: 0.25rem 0.5rem;
	border: 2px solid #eee;
`;

interface ButtMode {
	isOutline?: boolean;
	color?: string;
}

const Butt = styled.div<ButtMode>`
	padding: 0.5rem 0.75rem;
	text-align: center;
	border-radius: 5px;
	background: ${props => (props.isOutline ? '#fff' : props.color)};
	display: inline-block;
`;

const ButtLink = styled.a<ButtMode>`
	text-decoration: none;
	color: ${props => (props.isOutline ? props.color : '#fff')};

	:visited {
		text-decoration: none;
	}
`;

interface ButtProps extends ButtMode {
	children?: any;
	onClick?: (e: any) => null;
	href?: string;
}

export const Button = (props: ButtProps) => {
	const {
		children,
		href = '',
		onClick = (e: any) => null,
		color = UCBlue,
		isOutline = false,
	} = props;

	return (
		<ButtLink
			href={href}
			onClick={onClick}
			color={color}
			isOutline={isOutline}
		>
			<Butt color={color} isOutline={isOutline}>
				{children}
			</Butt>
		</ButtLink>
	);
};
