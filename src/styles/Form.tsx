import styled from 'styled-components';

export const Select = styled.select`
	-webkit-appearance: none;
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
`;