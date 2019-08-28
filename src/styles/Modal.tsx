import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.25);
	z-index: 999;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-content: center;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Message = styled.div`
	height: 20rem;
	background: white;
	border-radius: 5px;
	width: 20rem;
    padding: 2rem 1.5rem;
	display: flex;
	flex-direction: column;
`;

interface Props {
	isShowing?: boolean;
	scroll?: boolean;
	children: any;
}

const Modal: React.FC<Props> = ({ isShowing, children}: Props) => {
	return (
		<Container>
			<Message>{children}</Message>
		</Container>
	);
};

export default Modal;
