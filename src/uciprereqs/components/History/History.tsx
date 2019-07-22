import React from 'react';
import { SmallHeader } from '../../styles/Type';
import { HistoryBox } from './styles';

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
        <HistoryBox>
            <SmallHeader>Recently Viewed</SmallHeader>
            <table className="table">
                <tbody>
                    {
                        history!.map(
                            (course) => <ViewedClass key={course} course={course} clickHistory={clickHistory} />
                        )
                    }
                </tbody>
            </table>
        </HistoryBox>
        )
    );

};

export default History;