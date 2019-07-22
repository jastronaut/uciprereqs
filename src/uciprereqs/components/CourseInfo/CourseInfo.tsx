import React, { useState, useEffect } from 'react';
import Prereqs from '../Prereqs';
import Listing from '../Listing';
import MajorReqs from '../MajorReqs';
import Next from '../Next';
import { Heading, Text } from '../../styles/Type';
import { Badge } from '../../styles/Specials';
import { Title } from './styles';
import { CourseInfo as InfoType } from '../../Interfaces';

interface Props {
    dept: string;
    num: string;
}

const CourseInfo: React.FC<Props> = (props: Props) => {
    const {
        dept,
        num,
    } = props;
    const [info, setCourseInfo] = useState<InfoType | null>(null);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/departments/${dept}/courses/${num}`)
            .then(response => response.json())
            .then(body => setCourseInfo(body));
    }, [dept, num]);
    
    return (
        <section>
            {
                (info) ? (
                <>
                <Heading>
                <Badge>{dept + ' ' + num}</Badge>
                <Title>{info.title}</Title>
                </Heading>
               <Text>
                    {
                        info.desc ? info.desc : "No description found! 😰"
                    }
                </Text>
                <Prereqs prereqs={info.prereqs} />
                <Listing listing={info.listing} />
                <MajorReqs reqs={info.requirements} />
                <Next next={info.next} />
                </>
                ) : (
                    <img alt="Loading..." src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b76115d22808b5a64535445306a6d&rid=giphy.gif" />
                )
            }
        </section>
    );
}



export default CourseInfo;