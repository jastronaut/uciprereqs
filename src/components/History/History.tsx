import React from 'react';

interface Props {
    history?: Array<string>;
    course?: string;
    clickHistory: (...args: any[]) => any;
}

const ViewedClass: React.FC<Props> = (props: Props) => {
    const { course, clickHistory } = props;
    //@ts-ignore
    const [ dept, num ] = course.split(" ");
    return (
        <tr>
            <td onClick={(e) => clickHistory(dept, num) }>
                { course }
            </td>
        </tr>
    );
};

const History: React.FC<Props> = (props: Props) => {

    const { history, clickHistory } = props;
    // non-null assertion operator !
    return (
        (history === null || history!.length === 0) ? null : (
        <div>
            <label htmlFor="history">Recently Viewed</label>
            <table className="table">
                <tbody>
                    {
                        history!.map(
                            (course) => <ViewedClass course={course} clickHistory={clickHistory} />
                        )
                    }
                </tbody>
            </table>
        </div>
        )
    );

};

export default History;