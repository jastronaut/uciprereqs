import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch} from 'react-router-dom';
import CourseList from './components/CourseList';
import DeptList, { DEPTS } from './components/DeptList';
import CourseInfo from './components/CourseInfo';
import History from './components/History';
import './App.css';

interface Props extends RouteComponentProps {}
interface State {
	curDept: string;
	curCourse: string;
	courseList: Array<string>;
	history: Array<string>;
}

const NUM_HISTORY = 3;

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			curDept: '',
			curCourse: '',
			courseList: [],
			history: [],
		}

	}

	selectDept(dept: string, pushHist=true) {
		pushHist && this.props.history.push(`/${dept}`);
		this.setState({curDept: dept, curCourse: ''});
		this.getCourseList(dept);
	}

	onSelectDept = (e: React.FormEvent<EventTarget>) => {
		let target = e.target as HTMLSelectElement;
		this.selectDept(target.value);
	}

	getCourseList(theDept: string) {
		fetch(`http://apps.jasdelgado.com/uciprereqs/ajax/show_courses/?selectedDept=${theDept}`)
			.then((response) =>
				response.json()
			).then((jsonRes) => {
				//@ts-ignore
				this.setState({courseList: jsonRes.courses})
			});
	}

	renderCourseList() {
		const courseList = this.state.courseList;
		return (
			courseList.map((aClass: string) => (
				<option value={aClass}>{aClass}</option>
			))
		);
	}

	selectClass(newClass: string, pushHist=true) {
		let history = this.state.history;
		const toAdd = this.state.curDept + " " + newClass;
		const indexCourse = history.indexOf(toAdd);
		if (indexCourse === -1) {
			history.unshift(toAdd);
			if (history.length > NUM_HISTORY)
				history.pop();
		} else {
			history = (history.splice(0, indexCourse)).concat(history.splice(indexCourse + 1, history.length));
			history.unshift(toAdd);
		}
		pushHist && this.props.history.push(`/${this.state.curDept}/${newClass}`);
		this.setState({curCourse: newClass, history: history});
	}

	onSelectClass = (e: any) => {
		this.selectClass(e.target.value);
	}

	onClickHistory = (dept: string, num: string) => {
		this.selectDept(dept);
		this.selectClass(num);
	}

	displayCourseList = () => {
		const dept = this.state.curDept;
		const course = this.state.curCourse;
		if (dept !== '') {
			if (DEPTS.includes(dept)) {
				return <CourseList classes={this.state.courseList} onSelect={this.onSelectClass} selectedCourse={course} />
			} else {
				return <p className="has-text-danger">Please select a valid department.</p>
			}
		}
	}

	createRoutes = () => (
		<Switch>
			<Route path="/:dept/:num" render={({match}) => (
				<CourseInfo
					dept={match.params.dept}
					num={match.params.num}
					/>
			)} />
			<Route path="/" render={() => (
				this.state.curCourse !== '' ?
				<CourseInfo
					dept={this.state.curDept}
					num={this.state.curCourse}
				/>
				: null
			)} />
		</Switch>
	)
	
	componentDidMount() {
		let [dept, course=''] = this.props.history.location.pathname.split('/').splice(1);
		(dept !== '') && this.selectDept(dept, false);
		(course !== '') && this.selectClass(course, false);
	}

	render() {
		return (
				
			<div className="columns">
				<div className={`column is-one-quarter`}>
					<DeptList
						onSelect={this.onSelectDept}
						selectedDept={this.state.curDept}
					/>
					<br />
					{
						this.displayCourseList()
					}
					<History history={this.state.history} clickHistory={this.onClickHistory} />
				</div>
			<div className="column">
				{
					this.createRoutes()
				}
			</div>
			</div>

		);
	}
}

const UCIPrereqs = withRouter(App);
export default UCIPrereqs;
