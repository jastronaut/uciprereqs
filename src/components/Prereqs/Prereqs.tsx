import React from 'react';
import { CourseInfo } from '../../Interfaces';

interface Props {
    prereqs: CourseInfo['prereqs'];
}

const renderPrereq = (prereq: string) => (
    <tr key={prereq}><td>{prereq}</td></tr>
);

const renderPrereqGroup = (prereqGroup: { [title: string] : string } ) => {
    const groupList: Array<JSX.Element> = [];
    for (let [course, info] of Object.entries(prereqGroup)) {
        groupList.push(renderPrereq(course + ' ' + info));
    }
    return groupList;
}

const renderPrereqs = (prereqs: CourseInfo['prereqs']) => (
    prereqs.map((group) => (
        typeof(group) === "string" ? (
            renderPrereq(group)
        ) : (
            renderPrereqGroup(group) 
        )
    ))
)

const Prereqs: React.FC<Props> = (props: Props) => {
    const { prereqs } = props;
    return (
        <div className={`box prereqs`}>
            <h3 className={`title is-3`}>Prerequisites</h3>
            <table className={`table is-hoverable`}>
                <tbody>
                    {renderPrereqs(prereqs)}
                </tbody>
            </table>
        </div>
    );
}

export default Prereqs;