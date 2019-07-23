import styled from 'styled-components';
import React from 'react';
import { UCIGold, UCBlue } from './../Colors';
import { Box } from './../Grid';
import { transition, borderRadius } from './../Constants';

interface BadgeProps {
    bgColor?: string;
}

export const Badge = styled.div<BadgeProps>`
    color: #fff;
    background-color: ${props => props.bgColor ? props.bgColor : UCIGold};
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    ${transition};

    :hover {
        opacity: 0.8;
        ${transition};
    }
`;

interface TagProps extends BadgeProps {
    text: string;
    color: string;
    icon?: string;
}

export const Tag: React.FC<TagProps> = (props: TagProps) => {
    const { text, color } = props;
    return (
        <Badge bgColor={color}>
            {text}
        </Badge>
    );
}

interface CardColorProps {
    headerColor?: string;
}

const CardContainer = styled(Box)`
    margin: 1.5rem;
    border-radius: ${borderRadius};
    box-shadow: 5px 5px 8px #dededede;
    ${transition};

    :hover {
        box-shadow: 7px 7px 8px #ccc;
        ${transition};
    }
`;

const CardHeader = styled.h3<CardColorProps>`
    background-color: ${ props => props.headerColor ? props.headerColor : UCBlue};
    color: #fff;
    height: 1.5rem;
    margin: 0;
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: none;
    border-top-right-radius: ${borderRadius};
    border-top-left-radius: ${borderRadius};
`;

    // border: 1px solid lightgray;

const CardBody = styled.div`
    padding: 1rem;
    border-bottom-right-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
    border-top: none;
`;

interface CardProps extends CardColorProps {
    title: string;
    children: JSX.Element | any;
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
    // const {title, content, headerColor=''} = props;
    return (
        <CardContainer>
            <CardHeader {...props.headerColor}>{props.title}</CardHeader>
            <CardBody>{props.children}</CardBody>
        </CardContainer>
    );
}

interface CardDeckProps {
    dealt?: number;
}

function toPercent(num: number) {
    const res = Math.ceil((1 / num) * 100);
    return res.toString() + '%';
}

export const CardDeck = styled.div<CardDeckProps>`
    display: block;
    @media (min-width: 850px) {
        display: flex;

        ${CardContainer} {
            flex-basis: ${props => toPercent(props.dealt || 1)};
        }

        ${CardContainer}:first-child {
            margin-left: 0;
        }

        ${CardContainer}:last-child {
            margin-right: 0;
        }
    }
`;