import React, { useState, useEffect, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import CourseList from './components/CourseList';
import DeptList, { DEPTS } from './components/DeptList';
import CourseInfo from './components/CourseInfo';
import History from './components/History';
import addCourseHistory from './helpers/HistoryList';
import { GridContainer, SideBar, MainContent } from '../styles/Grid';

interface Props extends RouteComponentProps {}

const usePrevious = (dept: string) => {
	const ref = useRef<string>();
	useEffect(() => {
		ref.current = dept;
	});
	return ref.current;
};

const App: React.FC<Props> = (props: Props) => {
	const { history } = props;
	const [dept, setDept] = useState<string>('');
	const [pushHistory, setPushHistory] = useState<boolean>(false);
	const [course, setCourse] = useState<string>('');
	const [courseList, setCourseList] = useState<Array<string>>([]);
	const [histList, setHistList] = useState<Array<string>>([]);

	const prevDept = usePrevious(dept);

	// https://adamrackis.dev/state-and-use-reducer/
	useEffect(() => {
		document.title = 'UCI Prereqs';
		let [pathDept, pathCourse = ''] = history.location.pathname
			.split('/')
			.splice(2);
		pathDept !== '' && setDept(pathDept);
		pathCourse !== '' && setCourse(pathCourse);
		setPushHistory(true);
	}, []);

	useEffect(() => {
		if (dept !== '') {
			pushHistory && history.push(`/prereqs/${dept}`);
			getCourseList(dept);
		}
	}, [dept]);

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

	const onSelectDept = (e: React.FormEvent<EventTarget>) => {
		let target = e.target as HTMLSelectElement;
		setDept(target.value);
	};

	useEffect(() => {
		setHistList(addCourseHistory(histList, dept + ' ' + course));
		pushHistory && history.push(`/prereqs/${dept}/${course}`);
	}, [histList, dept, course]);

	const onSelectCourse = (e: React.FormEvent<EventTarget>) => {
		let target = e.target as HTMLSelectElement;
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
				return (
					<p className="has-text-danger">
						Please select a valid department.
					</p>
				);
			}
		}
	};

	return (
		<GridContainer>
			<SideBar>
				<DeptList onSelect={onSelectDept} selectedDept={dept} />
				<br />
				{displayCourseList()}
				<History history={histList} clickHistory={onClickHistory} />
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
	);
};

const UCIPrereqs = withRouter(App);
export default UCIPrereqs;
