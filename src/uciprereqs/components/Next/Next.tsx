import React from 'react';
import { SectionHeader } from '../../../styles/Type';
import { CourseInfo } from '../../../constants/Interfaces';

interface Props {
	next: CourseInfo['next'];
}

const Next: React.FC<Props> = (props: Props) => {
	const { next } = props;
	return (
		<div className="box">
			<SectionHeader>Next classes to take</SectionHeader>
			{next.length > 0 ? (
				<table className={`table is-hoverable`}>
					<tbody>
						{next.map(course => (
							<tr key={course}>
								<td>{course}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>This class is not a prerequisite for any other classes.</p>
			)}
		</div>
	);
};

export default Next;
