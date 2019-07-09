import React from 'react';

interface Props {
    classes: Array<string>;
    onSelect: (...args: any[]) => any;
}

const ClassList: React.FC<Props> = (props: Props) => {
    const { classes, onSelect } = props;

    const renderClassList = () => {
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
            <select onChange={(e) => onSelect(e)} >
                <option value="" selected disabled={true}>Course</option>
                {renderClassList()}
            </select>
        </>
    );
};

export default ClassList;