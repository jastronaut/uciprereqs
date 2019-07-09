import React from 'react';
import { CourseInfo } from '../../Interfaces';

interface Props {
    reqs: CourseInfo['requirements'];
}

interface MajorProps {
    major: string;
    specs: Array<string>;
}

const Major: React.FC<MajorProps> = (props: MajorProps) => {
    const { major, specs } = props;
    return (
        <>
            <h4 className={`title is-4`}>{major}</h4>
            <table className="table">
            <tbody>
            {
                (specs) ? 
                specs.map((spec: string) => (<tr key={spec}><td>{spec}</td></tr>)) : null
            }
            </tbody>
            </table>
        </>
    );
}


const MajorReqs: React.FC<Props> = (props: Props) => {
    const reqs = props.reqs;
    let allSpecs : Array<JSX.Element> = [];

    for (var major in reqs) {
        if (reqs[major].length > 0)
            allSpecs.push(<Major key={major} major={major} specs={reqs[major]} />);
    }

    if (allSpecs.length > 0) {
        return (
            <div>
                <h3 className={`title is-3`}>Major Requirements Filled</h3>
                {allSpecs}
            </div>
        );
    }

    return null;
}

export default MajorReqs;