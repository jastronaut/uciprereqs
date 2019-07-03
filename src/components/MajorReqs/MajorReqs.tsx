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
                specs.map((spec: string) => (<tr><td>{spec}</td></tr>)) : null
            }
            </tbody>
            </table>
        </>
    );
}


const MajorReqs: React.FC<Props> = (props: Props) => {
    const reqs = props.reqs;
    let allSpecs : Array<any> = [];
    for (var major in reqs) {
        //@ts-ignore
        allSpecs.push((<Major major={major} specs={reqs[major]} />));
    }
    return (
        <div>
            <h3 className={`title is-3`}>Major Requirements Filled</h3>
            {allSpecs}
        </div>
    );
}

export default MajorReqs;