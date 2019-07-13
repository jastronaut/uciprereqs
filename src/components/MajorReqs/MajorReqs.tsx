import React from 'react';
import { SectionHeader } from '../../styles/Type';
import { Card, CardDeck } from '../../styles/Specials';
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
        <Card title={major}>
            {
                (specs) ? 
                specs.map((spec: string) => (<p key={spec}>{spec}</p>)) : null
            }
        </Card>
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
                <SectionHeader>Major Requirements Filled</SectionHeader>
                <CardDeck>
                    {allSpecs}
                </CardDeck>
            </div>
        );
    }

    return null;
}

export default MajorReqs;