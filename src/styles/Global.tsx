import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        height: 100%;
    }

    #root {
        min-height: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;