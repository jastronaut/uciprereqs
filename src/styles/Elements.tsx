import styled from 'styled-components';
import { transition } from './Animation';

export const ListItem = styled.li`
    padding-left: 0.5rem;
    line-height: 2rem;
    ${transition};
    border-bottom: 1px solid lightgrey;

    :hover {
        background: lightgrey;
        ${transition};
    }

    :last-of-type {
        border-bottom: none;
    }

`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 auto;
`;