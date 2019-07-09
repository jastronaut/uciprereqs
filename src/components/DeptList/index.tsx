import React from 'react';

export const DEPTS = [
    'CS',
    'INF',
];

interface Props {
    onSelect: (...args: any) => any;
    selectedDept?: string;
}

const DeptList: React.FC<Props> = (props: Props) => {
    const { onSelect, selectedDept='' } = props;
    const renderDepts = (dept: string) => (
        <option key={dept} value={dept}>
            {dept}
        </option>
    );
    const depts = DEPTS.map((dept) => renderDepts(dept));

    return (
        <>
        <label htmlFor="selectDept">Select Department</label><br />
        <select onChange={(e) => onSelect(e)} value={selectedDept} >
            <option value="" disabled={true}>Departments</option>
            { depts }
        </select>
        </>
    );
}

export default DeptList;