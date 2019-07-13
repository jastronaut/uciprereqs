import styled from 'styled-components';

interface GridTypes {
    vertical?: boolean;
}

export const GridContainer = styled.div<GridTypes>`
    padding: 2rem 2rem;
    display: flex;
    flex-direction: ${props => props.vertical ? 'column' : 'row'};
    @media screen and (max-width: 850px) {
        display: inline-block;
    }
`;

interface BoxTypes {
    space?: 'half' | 'third' | 'fourth' | 'fifth'; 
}

export const Box = styled.div<BoxTypes>`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: ${
        props => {
            if (props.space === 'half')
                return '50%';
            if (props.space === 'third')
                return '33%';
            if (props.space === 'fourth')
                return '25%';
            if (props.space === 'fifth')
                return '20%';
            return 'auto';
        }
    };
`;

export const SideBar = styled.div`
    flex: 1 1 25%;

    @media screen and (max-width: 850px) {
        text-align: center;
    }
`;

export const MainContent = styled.div`
    flex: 3 3 75%;
`;