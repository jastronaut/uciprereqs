import styled from 'styled-components';

interface TypeProps {
    color?: string;
}

export const PageTitle = styled.h1`
    color: #fff;
    font-size: 3rem;
    text-align: center;
`;

export const Heading = styled.h1<TypeProps>`
    color: ${props => props.color ? props.color : '#000'};
    font-size: 2rem;
    margin-bottom: 1.5rem;

    > * {
        display: inline;
    }

    @media screen and (max-width: 850px) {
        > * {
            font-size: 1.5rem;
        }
    }
`;

export const SectionHeader = styled.h2`
`;

export const Text = styled.p`
    line-height: 1.5rem;
`;