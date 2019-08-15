import React from 'react';
import { Select, InputArea, Label } from '../../styles/Form';

interface Props {
	allProfs: string[];
	onSelect: (e: React.FormEvent<EventTarget>) => void;
	selectedProf?: string;
}

const ProfList: React.FC<Props> = (props: Props) => {
	const { allProfs, onSelect, selectedProf = '' } = props;
	const renderProfs = (prof: string) => (
		<option key={prof} value={prof}>
			{prof}
		</option>
	);
	const profs = allProfs.map(prof => renderProfs(prof));

	return (
		<InputArea>
			<Label htmlFor="selectProf">Select Professor</Label>
			<br />
			<Select onChange={e => onSelect(e)} value={selectedProf}>
				<option value="" disabled={true}>
					Professors
				</option>
				{profs}
			</Select>
		</InputArea>
	);
};

export default ProfList;
