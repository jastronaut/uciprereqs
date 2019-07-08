import React, { useState } from 'react';
import Prereqs from '../Prereqs';
import Listing from '../Listing';
import MajorReqs from '../MajorReqs';
import Next from '../Next';
import { CourseBadge } from './styles';
import { CourseInfo } from '../../Interfaces';

interface Props {
    dept: string;
    num: string;
}

const ClassInfo: React.FC<Props> = (props: Props) => {
    const {
        dept,
        num,
    } = props;
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);

    fetch(`http://apps.jasdelgado.com/uciprereqs/ajax/show_course_info/?selectedDept=${dept}&selectedNum=${num}`)
        .then((response) => 
            response.json()
        ).then((jsonRes) => {
            //@ts-ignore
            setCourseInfo(jsonRes)
    });

    //@ts-ignore
    return (
        <section>
            {
                (courseInfo ) ? (
                <>
                <CourseBadge>
                <h1 className={`title is-2`}>{dept} </h1>
                <h1 className={`title is-2`}>{num}</h1>
                </CourseBadge>
                <h3 className={`subtitle is-3 has-text-gray`}>{courseInfo.title}</h3>
                <article className={`message desc`}>
                    <div className={`message-body desc`}>{courseInfo.desc}</div>
                </article>
                <Prereqs allPrereqs={courseInfo.prereqs} />
                <Listing listing={courseInfo.listing} />
                <MajorReqs reqs={courseInfo.requirements} />
                <Next next={courseInfo.next} />
                </>
                ) : (
                    <img src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b76115d22808b5a64535445306a6d&rid=giphy.gif" />
                )
            }
        </section>
    );
}

export default ClassInfo;