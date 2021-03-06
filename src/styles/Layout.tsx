import styled from 'styled-components';
/* import bg from '../constants/img/bg.jpg'; */

export const Header = styled.header`
	height: 15%;
	background-attachment: fixed;
`;

export const HeaderGradient = styled.div`
	padding: 2rem;
	background: linear-gradient(transparent, rgba(0, 0, 0, 1));
	margin: 0;
`;

export const Container = styled.main`
	margin: auto 5rem;

	@media screen and (max-width: 850px) {
		margin: auto 3rem;
	}
`;
