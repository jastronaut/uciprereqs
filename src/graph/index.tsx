import React, { useState, useEffect } from 'react';
import { UCBlue, UCIGold } from '../styles/Colors';
import { ForceGraph2D, CanvasGraphNode, CanvasGraphLink } from 'react-force-graph';
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
    const [ graphData, setGraphData ] = useState<any>({"nodes": [], "links": []});
    const [ hoverLink, setHoverLink ] = useState<any>(null);

    useEffect(() => {
       console.log('starting...');

       fetch('test-d3-input.json')
        .then(res => res.json())
        .then(data => setGraphData(data));
    }, []);

    const drawNode = (node: CanvasGraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.id;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize); // some padding
        ctx.fillStyle = UCBlue;
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle='#fff';
        ctx.fillText(label, node.x, node.y);
    };

    const handleLinkHover = (link: CanvasGraphLink) => {
        setHoverLink(link);
    };

    return (
        <ForceGraph2D
            graphData={graphData}
            dagMode="td"
            nodeAutoColorBy="group"
            dagLevelDistance={15}
            linkColor={() => UCIGold}
            linkWidth={(link: CanvasGraphLink) => link === hoverLink ? 5 : 1}
            linkDirectionalParticles={hoverLink ? 4 : 1}
            nodeCanvasObject={drawNode}
            onLinkHover={handleLinkHover}
        />
    );
};

export default Graph;
