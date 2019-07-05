import React from 'react';
import { Link } from 'react-router-dom';

const DEPTS = [
    'CS',
    'INF',
];

interface Props {
    onSelect: (...args: any) => any;
}

const DeptList: React.FC<Props> = (props: Props) => {
    const { onSelect } = props;
    const onClickDept = (dept: string) => {window.location.replace(`/${dept}/`);};
    const renderDepts = (dept: string) => (
        <option
            value={dept}
            onClick={() => onClickDept(dept)}
        >
            {dept}
        </option>
    );
    const depts = DEPTS.map((dept) => renderDepts(dept));

    return (
        <>
        <label htmlFor="selectDept">Select Department</label><br />
        <select onChange={(e) => onSelect(e)} >
            <option value="" selected={true} disabled={true}>Departments</option>
            { depts }
        </select>
        </>
    );
}

export default DeptList;