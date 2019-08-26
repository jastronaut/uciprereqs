import React, { useState, useEffect, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import CourseList from './components/CourseList';
import DeptList, { DEPTS } from './components/DeptList';
import CourseInfo from './components/CourseInfo';
import History from './components/History';
import addCourseHistory from './helpers/HistoryList';
import { GridContainer, SideBar, MainContent } from '../styles/Grid';
import { SiteHeader, Container } from '../styles/Layout';

const usePrevious = (dept: string) => {
	const ref = useRef<string>();
	useEffect(() => {
		ref.current = dept;
	});
	return ref.current;
};

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
	const { history } = props;
	const [dept, setDept] = useState<string>('');
	const [pushHistory, setPushHistory] = useState<boolean>(false);
	const [course, setCourse] = useState<string>('');
	const [courseList, setCourseList] = useState<string[]>([]);
	const [histList, setHistList] = useState<string[]>([]);

	const prevDept = usePrevious(dept);

	// https://adamrackis.dev/state-and-use-reducer/
	useEffect(() => {
		document.title = 'UCI Prereqs';
		const [pathDept, pathCourse = ''] = history.location.pathname
			.split('/')
			.splice(2);
		pathDept !== '' && setDept(pathDept);
		pathCourse !== '' && setCourse(pathCourse);
		setPushHistory(true);
	}, []);

	const getCourseList = (theDept: string) => {
		if (theDept !== prevDept && prevDept !== '') setCourse('');
		fetch(`http://127.0.0.1:8000/departments/${theDept}`)
			.then(response => {
				if (response.ok) return response.json();
				else throw new Error('bad department');
			})
			.then(jsonRes => {
				setCourseList(jsonRes.courses);
			})
			.catch(err => null);
	};

	useEffect(() => {
		if (dept !== '') {
			pushHistory && history.push(`/prereqs/${dept}`);
			getCourseList(dept);
		}
	}, [dept]);

	const onSelectDept = (e: React.FormEvent<EventTarget>) => {
		const target = e.target as HTMLSelectElement;
		setDept(target.value);
	};

	useEffect(() => {
		setHistList(addCourseHistory(histList, dept + ' ' + course));
		pushHistory && history.push(`/prereqs/${dept}/${course}`);
	}, [histList, dept, course]);

	const onSelectCourse = (e: React.FormEvent<EventTarget>) => {
		const target = e.target as HTMLSelectElement;
		setCourse(target.value);
	};

	const onClickHistory = (newDept: string, newCourse: string) => {
		setDept(newDept);
		setCourse(newCourse);
	};

	const displayCourseList = () => {
		if (dept !== '') {
			if (DEPTS.includes(dept)) {
				return (
					<CourseList
						classes={courseList}
						onSelect={onSelectCourse}
						selectedCourse={course}
					/>
				);
			} else {
				return <p>Please select a valid department.</p>;
			}
		}
	};

	return (
		<>
			<SiteHeader />
			<Container>
				<GridContainer>
					<SideBar>
						<DeptList onSelect={onSelectDept} selectedDept={dept} />
						<br />
						{displayCourseList()}
						<History
							history={histList}
							clickHistory={onClickHistory}
						/>
					</SideBar>
					<MainContent>
						<Switch>
							<Route
								path="prereqs/:dept/:num"
								render={({ match }) => (
									<CourseInfo
										dept={match.params.dept}
										num={match.params.num}
									/>
								)}
							/>
							<Route
								path="/prereqs"
								render={() =>
									course !== '' ? (
										<CourseInfo dept={dept} num={course} />
									) : null
								}
							/>
						</Switch>
					</MainContent>
				</GridContainer>
			</Container>
		</>
	);
};

const UCIPrereqs = withRouter(App);
export default UCIPrereqs;
