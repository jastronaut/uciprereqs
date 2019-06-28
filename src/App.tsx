import React from 'react';
import  ClassInfo from './components/ClassInfo';
import History from './components/History';
import './App.css';

interface Props {}
interface State {
	curDept: string;
	curClass: string;
	classList: Array<string>;
	courseInfo: any;
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
	}

	selectDept(dept: string) {
		this.setState({curDept: dept, curClass: ''});
		this.getClassList(dept);
	}

	onSelectDept(e: any) {
		this.selectDept(e.target.value);
	}

	renderDeptOptions() {
		return (Depts.map((dept) => (<option value={dept}>{dept}</option>)));
	}

	getClassList(theDept: string) {
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState({classList: xhr.response.courses});
			}
		}

		xhr.open('GET', `http://apps.jasdelgado.com/uciprereqs/ajax/show_courses/?selectedDept=${theDept}`, true);
		xhr.send();
	}

	getCourseInfo(theClass: string) {
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState({courseInfo: xhr.response});
			}
		}

		xhr.open('GET', `http://apps.jasdelgado.com/uciprereqs/ajax/show_course_info/?selectedDept=${this.state.curDept}&selectedNum=${theClass}`, true);
		xhr.send();
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
			// finish this
			// history = (history.splice(0, indexCourse + 1)).concat()
			history.unshift(toAdd);
		}
		this.setState({curClass: newClass, history: history});
		this.getCourseInfo(newClass);
	}

	onSelectClass(e: any) {
		this.selectClass(e.target.value);
	}

	onClickHistory(dept: string, num: string) {
		this.selectDept(dept);
		this.selectClass(num);
	}

	render() {
		return (
			<div className="columns">
				<div className={`column is-one-quarter`}>
					<label htmlFor="selectDept">Select Department</label><br />
					<select onChange={(e) => this.onSelectDept(e)}>
						{ this.renderDeptOptions() }
					</select>
					{
						(this.state.curDept !== '') ? (
							<select onChange={(e) => this.onSelectClass(e)}>
								{this.renderClassList()}
							</select>
						) : null
					}
				</div>
			<div className="column">
				{
					(this.state.courseInfo !== null && this.state.curClass !== '') ? (
						<ClassInfo
							{...this.state.courseInfo}
							dept={this.state.curDept}
							num={this.state.curClass}
						/>
					) : null
				}
				<History history={this.state.history} clickHistory={this.onClickHistory} />
			</div>
			</div>
		);
	}
}

export default App;
