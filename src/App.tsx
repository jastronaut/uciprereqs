import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CourseInfo } from './Interfaces';
import ClassList from './components/ClassList';
import DeptList from './components/DeptList';
import ClassInfo from './components/ClassInfo';
import History from './components/History';
import './App.css';

interface Props {}
interface State {
	curDept: string;
	curClass: string;
	classList: Array<string>;
	courseInfo: CourseInfo | null;
	history: Array<string>;
}

const NUM_HISTORY = 3;

const Depts = ['CS', 'INF'];

// const App: React.FC = () => {
class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			curDept: '',
			curClass: '',
			classList: [],
			courseInfo: null,
			history: [],
		}

		// this.onClickHistory = this.onClickHistory.bind(this);
		// this.selectDept = this.selectDept.bind(this);
		// this.selectClass = this.selectClass.bind(this);
	}

	selectDept(dept: string) {
		this.setState({curDept: dept, curClass: ''});
		this.getClassList(dept);
	}

	onSelectDept = (e: any) => {
		this.selectDept(e.target.value);
	}

	

	getClassList(theDept: string) {
		fetch(`http://apps.jasdelgado.com/uciprereqs/ajax/show_courses/?selectedDept=${theDept}`)
			.then((response) =>
				response.json()
			).then((jsonRes) => {
				//@ts-ignore
				this.setState({classList: jsonRes.courses})
			});
	}

	getCourseInfo(theClass: string) {
		fetch(`http://apps.jasdelgado.com/uciprereqs/ajax/show_course_info/?selectedDept=${this.state.curDept}&selectedNum=${theClass}`)
			.then((response) => 
				response.json()
			).then((jsonRes) => {
				//@ts-ignore
				this.setState({courseInfo: jsonRes})
			});
	}

	renderClassList() {
		const classList = this.state.classList;
		return (
			classList.map((aClass) => (
				<option value={aClass}>{aClass}</option>
			))
		);
	}

	selectClass(newClass: string) {
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
		
		this.getCourseInfo(newClass);

		this.setState({curClass: newClass, history: history});
		console.log(this.state.courseInfo);

	}

	onSelectClass = (e: any) => {
		this.selectClass(e.target.value);
	}

	onClickHistory = (dept: string, num: string) => {
		this.selectDept(dept);
		this.selectClass(num);
	}

	render() {
		return (
				
			<div className="columns">
				<div className={`column is-one-quarter`}>
					<DeptList onSelect={this.onSelectDept} />
					<br />
					<Switch>
						<Route path="/:dept" render={({match}) => { 
							// this.selectDept(match.params.dept);
							return (
							<ClassList classes={this.state.classList} onSelect={this.onSelectClass} />);
						 }} />
						<Route path="/:dept/:num" render={({match}) => {
							// this.selectDept(match.params.dept);
							return (
							<ClassList classes={this.state.classList} onSelect={this.onSelectClass} />);
						}} />
					</Switch>
					<History history={this.state.history} clickHistory={this.onClickHistory} />
				</div>
			<div className="column">
				{
					(this.state.courseInfo !== null && this.state.curClass !== '') ? (
						<ClassInfo
							{...this.state.courseInfo}
							dept={this.state.curDept}
							num={this.state.curClass}
						/>
					) : <h1>lol</h1>
				}
			</div>
			</div>

		);
	}
}

export default App;
