import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UCIPrereqs from './uciprereqs';
import Professors from './professors';
import Graph from './graph';
import { Header, HeaderGradient, Container } from './styles/Layout';
import { PageTitle } from './styles/Type';
import GlobalStyle from './styles/Global';

const Main: React.FC = () => (
	<BrowserRouter>
		<GlobalStyle />
		<Header>
			<HeaderGradient>
				<PageTitle>UCI Prereqs</PageTitle>
			</HeaderGradient>
		</Header>
		<Container>
			<Switch>
				<Route path='/prereqs' component={UCIPrereqs} />
				<Route path='/professor' component={Professors} />
				<Route path='/testgraph' component={Graph} />
			</Switch>
		</Container>
	</BrowserRouter>
);

export default Main;
