import React from 'react';
import { Select, InputArea, Label } from '../../../styles/Form';

interface Props {
    classes: Array<string>;
    onSelect: (...args: any[]) => any;
    selectedCourse: string;
}

const CourseList: React.FC<Props> = (props: Props) => {
    const { classes, onSelect, selectedCourse } = props;

    const renderCourseList = () => {
		return (
			classes.map((aClass) => (
				<option key={aClass} value={aClass}>{aClass}</option>
			))
		);
	}

    return (
        <InputArea>
            <Label htmlFor="classlist">Select Class</Label>
            <br />
            <Select onChange={(e) => onSelect(e)} value={selectedCourse}>
                <option value="" disabled={true}>Course</option>
                {renderCourseList()}
            </Select>
        </InputArea>
    );
};

export default CourseList;