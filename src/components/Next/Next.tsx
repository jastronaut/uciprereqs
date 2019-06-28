import React from 'react';

interface Props {
    next: Array<string>;
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