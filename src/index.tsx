import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Main from './App';

const render = (Component: any) =>
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	);

// ReactDOM.render(<Main />, document.getElementById('root'));
render(Main);

if ((module as any).hot) {
	(module as any).hot.accept('./App', () => render(Main));
}
