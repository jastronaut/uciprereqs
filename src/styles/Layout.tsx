import styled from 'styled-components';
import bg from '../constants/img/bg.jpg';
import { PageTitle } from './Type';
import React from 'react';

export const Header = styled.header`
	background-image: url(${bg});
	background-attachment: fixed;
`;

export const HeaderGradient = styled.div`
	background: linear-gradient(transparent, rgba(0, 0, 0, 1));
	margin: 0;
`;

export const Container = styled.main`
	height: 100%;
	margin: auto 5rem;

	@media screen and (max-width: 850px) {
		margin: auto 3rem;
	}
`;

export const SiteHeader = () => (
	<Header>
		<HeaderGradient>
			<PageTitle>UCI Prereqs</PageTitle>
		</HeaderGradient>
	</Header>
);
