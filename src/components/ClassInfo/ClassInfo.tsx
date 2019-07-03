import React from 'react';
import Prereqs from '../Prereqs';
import Listing from '../Listing';
import MajorReqs from '../MajorReqs';
import Next from '../Next';
import { CourseBadge } from './styles';
import { CourseInfo } from '../../Interfaces';

interface Props extends CourseInfo {
    dept: string;
    num: string;
}

const ClassInfo: React.FC<Props> = (props: Props) => {
    const {
        dept,
        num,
        title,
        prereqs,
        desc,
        requirements,
        listing,
        next
    } = props;
    return (
        <section>
            {
                (title === null || title === '') ? null : (
                    <>
                    <CourseBadge>
                        <h1 className={`title is-2`}>{dept} </h1>
                        <h1 className={`title is-2`}>{num}</h1>
                    </CourseBadge>
                    <h3 className={`subtitle is-3 has-text-gray`}>{title}</h3>
                    <article className={`message desc`}>
                        <div className={`message-body desc`}>{desc}</div>
                    </article>
                    <Prereqs allPrereqs={prereqs} />
                    <Listing listing={listing} />
                    <MajorReqs reqs={requirements} />
                    <Next next={next} />
                    </>
                )
            }
            
            
        </section>
    );
}

export default ClassInfo;