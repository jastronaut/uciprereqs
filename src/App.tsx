import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch} from 'react-router-dom';
import ClassList from './components/ClassList';
import DeptList, { DEPTS } from './components/DeptList';
import ClassInfo from './components/ClassInfo';
import History from './components/History';
import './App.css';

interface Props extends RouteComponentProps {}
interface State {
	curDept: string;
	curClass: string;
	classList: Array<string>;
	history: Array<string>;
}

const NUM_HISTORY = 3;

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			curDept: '',
			curClass: '',
			classList: [],
			history: [],
		}

	}

	selectDept(dept: string) {
		this.props.history.push(`/${dept}`);
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

	renderClassList() {
		const classList = this.state.classList;
		return (
			classList.map((aClass: string) => (
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
		this.props.history.push(`/${this.state.curDept}/${newClass}`);
		this.setState({curClass: newClass, history: history});
	}

	onSelectClass = (e: any) => {
		this.selectClass(e.target.value);
	}

	onClickHistory = (dept: string, num: string) => {
		this.selectDept(dept);
		this.selectClass(num);
	}

	displayClassList = () => {
		if (this.props.history.location.pathname !== '/') {
			const dept = this.props.history.location.pathname.split('/')[1];
			if (DEPTS.includes(dept)) {
				return <ClassList classes={this.state.classList} onSelect={this.onSelectClass} />
			} else {
				return <p className="has-text-danger">Please select a valid department.</p>
			}
		}
		return null;
	}

	createRoutes = () => (
		<Switch>
			<Route path="/:dept/:num" render={({match}) => (
				<ClassInfo
					dept={match.params.dept}
					num={match.params.num}
					/>
			)} />
			<Route path="/" render={() => (
				this.state.curClass !== '' ?
				<ClassInfo
					dept={this.state.curDept}
					num={this.state.curClass}
				/>
				: null
			)} />
		</Switch>
	)

	render() {
		return (
				
			<div className="columns">
				<div className={`column is-one-quarter`}>
					<DeptList onSelect={this.onSelectDept} />
					<br />
					{
						this.displayClassList()
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
