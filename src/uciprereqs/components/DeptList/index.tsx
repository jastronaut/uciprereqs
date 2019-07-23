import React from 'react';
import { Select, InputArea, Label } from '../../../styles/Form';

export const DEPTS = [
    'CS',
    'ICS',
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
        <InputArea>
        <Label htmlFor="selectDept">Select Department</Label><br />
        <Select onChange={(e) => onSelect(e)} value={selectedDept} >
            <option value="" disabled={true}>Departments</option>
            { depts }
        </Select>
        </InputArea>
    );
}

export default DeptList;