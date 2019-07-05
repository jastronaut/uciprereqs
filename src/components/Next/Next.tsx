import React from 'react';
import { CourseInfo } from '../../Interfaces';

interface Props {
    next: CourseInfo['next'];
}

const Next: React.FC<Props> = (props: Props) => {
    const { next } = props;
    return (
        <div className="box">
            <h3 className={`title is-3`}>Next classes to take</h3>
            <table className={`table is-hoverable`}>
                <tbody>
                    {
                        next.map((course) => 
                                    (<tr><td>{course}</td></tr>)
                                )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Next;