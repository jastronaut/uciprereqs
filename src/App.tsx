import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch} from 'react-router-dom';
import CourseList from './components/CourseList';
import DeptList, { DEPTS } from './components/DeptList';
import CourseInfo from './components/CourseInfo';
import History from './components/History';
import HistoryList from './helpers/HistoryList';
import './App.css';

interface Props extends RouteComponentProps {}
interface State {
	curDept: string;
	curCourse: string;
	courseList: Array<string>;
	history: HistoryList;
}

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			curDept: '',
			curCourse: '',
			courseList: [],
			history: new HistoryList(),
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
		fetch(`http://127.0.0.1:8000/departments/${theDept}`)
			.then(response => {
				if (response.ok)
					return response.json();
				else
					throw new Error('bad department');
			}).then(jsonRes => {
				this.setState({courseList: jsonRes.courses})
			}).catch(err => console.log(err)
			);
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
		const history = this.state.history;
		history.add(this.state.curDept + " " + newClass);
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
					<History history={this.state.history.all()} clickHistory={this.onClickHistory} />
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
