import React from 'react';
import { Container, Page, CredentialArea } from './style';
import { Container as GlobalContainer } from '../../styles/Layout';
import { Heading } from '../../styles/Type';
import { TextInput, Button } from '../../styles/Form';

interface Props {
	ref?: string;
}

// these variable names suck
const Login: React.FC<Props> = (props: Props) => {
	return (
		<GlobalContainer>
			<Page>
				<Container>
					<Heading centered>Login to UCIPrereqs</Heading>
					<CredentialArea>
						<TextInput key="username" placeholder="Username" required />
						<TextInput key="password" placeholder="Password" required />
                        <Button>Submit</Button>
					</CredentialArea>
				</Container>
			</Page>
		</GlobalContainer>
	);
};

export default Login;
