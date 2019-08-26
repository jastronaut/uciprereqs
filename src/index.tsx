import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UCIPrereqs from './uciprereqs';
import Professors from './professors';
import Graph from './graph';
import Login from './accounts/Login';
import GlobalStyle from './styles/Global';
// import * as serviceWorker from './serviceWorker';

const Main: React.FC = () => (
	<BrowserRouter>
		<GlobalStyle />
		<Switch>
			<Route path="/prereqs" component={UCIPrereqs} />
			<Route path="/professor" component={Professors} />
			<Route path="/testgraph" component={Graph} />
			<Route path="/login" component={Login} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
