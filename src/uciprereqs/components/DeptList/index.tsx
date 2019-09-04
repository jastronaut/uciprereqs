import React, { useEffect, useState } from 'react';
import { Select, InputArea, Label } from '../../../styles/Form';

export const DEPTS = ['CS', 'ICS', 'INF', 'LOL'];

interface Props {
	onSelect: (args: React.FormEvent<EventTarget>) => void;
	selectedDept?: string;
}

const DeptList: React.FC<Props> = (props: Props) => {
	const [deptsList, setDeptsList] = useState<string[]>([]);

	useEffect(() => {
		fetch(`http://localhost:8000/api/depts/`)
			.then(response => {
				if (response.ok) return response.json();
				else throw new Error('bad depts request');
			})
			.then(jsonRes => {
				console.log('lol');
				setDeptsList(jsonRes.depts);
			})
			.catch(err => console.log('fuck'));
	}, []);

	const { onSelect, selectedDept = '' } = props;
	const renderDepts = (dept: string) => (
		<option key={dept} value={dept}>
			{dept}
		</option>
	);
	// const depts = DEPTS.map(dept => renderDepts(dept));
	const depts = deptsList && deptsList.length > 0 ? deptsList.map(dept => renderDepts(dept)) : [];

	return (
		<InputArea>
			<Label htmlFor='selectDept'>Select Department</Label>
			<br />
			<Select onChange={e => onSelect(e)} value={selectedDept}>
				<option value='' disabled={true}>
					Departments
				</option>
				{depts}
			</Select>
		</InputArea>
	);
};

export default DeptList;
