import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UCIPrereqs from './UCIPrereqs';
import { Header, HeaderGradient } from './styles/Layout';
import { PageTitle } from './styles/Type';
// import * as serviceWorker from './serviceWorker';

interface MainProps {
    title: string;
    subtitle?: string;
}

const Main: React.FC<MainProps> = (props: MainProps) => (
        <Header>
            <HeaderGradient>
            <PageTitle>{props.title}</PageTitle>
            </HeaderGradient>
        </Header>
);

ReactDOM.render(
    <BrowserRouter><Main title="UCI Prereqs" /><UCIPrereqs /></BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
