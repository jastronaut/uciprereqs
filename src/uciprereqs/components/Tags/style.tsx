import styled, { createGlobalStyle } from 'styled-components';
import {
	TextInput as OldTextInput,
	InputArea as OldInputArea,
} from '../../../styles/Form';

export const TagListItemStyled = styled.div`
	text-align: left;
	padding: 0.5rem 1rem;
`;

export const TagsArea = styled.div`
	/* max-height: 15rem; */
	flex-basis: 90%;
	overflow: auto;
	border-bottom: solid 1px #aaa;
`;

export const TextInput = styled(OldTextInput)`
	width: 100%;
	padding: 0.25rem 0.15rem;
	font-size: 1.05rem;
`;

export const InputArea = styled(OldInputArea)`
	padding: 0.5rem 1rem;
	flex-basis: 10%;
`;

export const GlobalStyleOverride = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;
