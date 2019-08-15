import React from 'react';
import { SectionHeader, Text } from '../../../styles/Type';
import { CourseInfo } from '../../../Interfaces';

interface Props {
	prereqs: CourseInfo['prereqs'];
}

const renderPrereq = (prereq: string) => (
	<tr key={prereq}>
		<td>{prereq}</td>
	</tr>
);

const renderPrereqGroup = (prereqGroup: { [title: string]: string }) => {
	const groupList: Array<JSX.Element> = [];
	for (let [course, info] of Object.entries(prereqGroup)) {
		groupList.push(renderPrereq(course + ' ' + info));
	}
	return groupList;
};

const renderPrereqs = (prereqs: CourseInfo['prereqs']) =>
	prereqs.map(group =>
		typeof group === 'string'
			? renderPrereq(group)
			: renderPrereqGroup(group)
	);

const Prereqs: React.FC<Props> = (props: Props) => {
	const { prereqs } = props;
	return (
		<div className={`box prereqs`}>
			<SectionHeader>Prerequisites</SectionHeader>
			{prereqs.length < 1 ? (
				<Text indented>No Prerequisites for this class! ✨</Text>
			) : (
				<table className={`table is-hoverable`}>
					<tbody>{renderPrereqs(prereqs)}</tbody>
				</table>
			)}
		</div>
	);
};

export default Prereqs;
