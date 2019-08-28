import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import ProfList from './ProfList';
import ProfInfo from './ProfInfo';
import { GridContainer, SideBar, MainContent } from '../styles/Grid';

const ProfessorsApp: React.FC<RouteComponentProps> = (
	props: RouteComponentProps
) => {
	const { history } = props;
	const [prof, setProf] = useState<string>('');
	const [allProfs, setAllProfs] = useState<string[]>([]);

	useEffect(() => {
		document.title = 'UCI Professors';
		fetch(`http://127.0.0.1:8000/all_professors/`)
			.then(response => {
				if (response.ok) return response.json();
				else throw new Error('bad department');
			})
			.then(jsonRes => {
				setAllProfs(jsonRes.professors);
			})
			.catch(err => null);
		const pathProf = history.location.pathname.split('/').splice(1)[1];
		pathProf !== '' && setProf(pathProf);
	}, []);

	useEffect(() => {
		prof !== '' && history.push(`/professor/${prof}`);
	}, [prof, history]);

	const onSelectProf = (e: React.FormEvent<EventTarget>) => {
		const target = e.target as HTMLSelectElement;
		setProf(target.value);
	};

	return (
		<GridContainer>
			<SideBar>
				<ProfList
					allProfs={allProfs}
					onSelect={onSelectProf}
					selectedProf={prof}
				/>
			</SideBar>
			<MainContent>
				<Switch>
					<Route
						path='professor/:prof'
						render={({ match }) => (
							<ProfInfo
								prof={decodeURIComponent(match.params.prof)}
							/>
						)}
					/>
					<Route
						path='/professor'
						render={() =>
							prof !== '' ? <ProfInfo prof={prof} /> : 'hhh'
						}
					/>
				</Switch>
			</MainContent>
		</GridContainer>
	);
};

const Professors = withRouter(ProfessorsApp);
export default Professors;
