import styled from 'styled-components';
import bg from '../constants/img/bg.jpg';

export const Header = styled.header`
    height: 15%;
    background-image: url(${bg});
    background-attachment: fixed;
`;

export const HeaderGradient = styled.div`
    padding: 2rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    margin: 0;
`;