import React, { useState, useEffect } from 'react';
import { fabric } from 'react-fabricjs';
import { init_graph } from './graph';
// import { CourseInfo } from '../Interfaces';
interface Props {}

// const getPrereqs = (course: string) => {
//     const [dept, num] = course.split(' ');
//     let prereqs: CourseInfo['prereqs'] = [];
//     fetch(`http://127.0.0.1:8000/departments/${dept}/courses/${num}`)
//         .then(resp => resp.json())
//         .then(body => (prereqs = body.prereqs));
// }

const Graph: React.FC<Props> = (props: Props) => {
    const [ targetCourse, setTargetCourse ] = useState<string>('CS 134');
    const [ prereqsList, setPrereqsList ] = useState<{ [title: string] : Array<string>}>({'CS 134': ['A', 'B', 'C']});
    useEffect(() => {
       console.log('starting...');
       const canvas = new fabric.Canvas('c');
       init_graph(targetCourse, prereqsList, canvas);
    }, []);

    return (
        <canvas id='c' />
    );
};

export default Graph;
