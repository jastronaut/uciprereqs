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
            {
                (next.length > 0) ? (
                <table className={`table is-hoverable`}>
                    <tbody>
                        {
                            next.map(course => (<tr key={course}><td>{course}</td></tr>))
                        }
                    </tbody>
                </table>
                ) : (
                    <p>This class is not a prerequisite for any other classes.</p>
                )
            }
        </div>
    );
};

export default Next;