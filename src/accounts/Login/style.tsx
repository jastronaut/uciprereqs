import styled from 'styled-components';

export const Page = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    min-height: 100%;
`;

export const Container = styled.div`
    width: 50%;
    flex: 1;
    margin: 0 15rem;
`;

export const CredentialArea = styled.div`
    margin: 0 15rem;


    > input {
    font-size: 1.05rem;
        width: 100%;
        margin-bottom: 0.5rem;
    }

    > input:last-child {
        margin-bottom: 0.75rem;
    }
`;
