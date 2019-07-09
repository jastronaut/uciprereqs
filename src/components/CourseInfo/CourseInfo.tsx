import React, { useState, useEffect } from 'react';
import Prereqs from '../Prereqs';
import Listing from '../Listing';
import MajorReqs from '../MajorReqs';
import Next from '../Next';
import { CourseBadge } from './styles';
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
        console.log(`http://apps.jasdelgado.com/uciprereqs/ajax/show_course_info/?selectedDept=${dept}&selectedNum=${num}`);
        fetch(`http://apps.jasdelgado.com/uciprereqs/ajax/show_course_info/?selectedDept=${dept}&selectedNum=${num}`)
            .then(response => response.json())
            .then(body => setCourseInfo(body));
    }, [dept, num]);
    

    return (
        <section>
            {
                (info) ? (
                <>
                <CourseBadge>
                <h1 className={`title is-2`}>{dept} </h1>
                <h1 className={`title is-2`}>{num}</h1>
                </CourseBadge>
                <h3 className={`subtitle is-3 has-text-gray`}>{info.title}</h3>
                <article className={`message desc`}>
                    <div className={`message-body desc`}>
                        {
                            info.desc ? info.desc : "(No description provided)"
                        }
                    </div>
                </article>
                <Prereqs allPrereqs={info.prereqs} />
                <Listing listing={info.listing} />
                <MajorReqs reqs={info.requirements} />
                <br />
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