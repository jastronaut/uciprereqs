import React from 'react';

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
        <>
            <label htmlFor="classlist">Select Class</label>
            <br />
            <select onChange={(e) => onSelect(e)} value={selectedCourse}>
                <option value="" disabled={true}>Course</option>
                {renderCourseList()}
            </select>
        </>
    );
};

export default CourseList;