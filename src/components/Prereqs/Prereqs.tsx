import React from 'react';

interface Props {
    allPrereqs: Array<string>
}

const Prereqs: React.FC<Props> = (props: Props) => {
    const { allPrereqs } = props;
    const prereqsList = allPrereqs.map((p) => (<tr><td>{p}</td></tr>));
    return (
        <div className={`box prereqs`}>
            <h3 className={`title is-3`}>Prerequisites</h3>
            <table className={`table is-hoverable`}>
                <tbody>
                    {prereqsList}
                </tbody>
            </table>
        </div>
    );
}

export default Prereqs;