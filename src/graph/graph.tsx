import * as COLOR from './colors';
import * as VARS from './constants';
import { find_prereq_space, get_node_coords } from './spacehelpers';
import { fabric } from 'react-fabricjs';

const color = COLOR.needToTake;

interface NodeInit {
    x: number;
    y: number;
    r: number;
    c: number;
    color: string;
    title: string;
};

interface Node extends NodeInit {
    rect: any;
    label: any;
    prereqClasses: Array<string>;
    nextClasses: Array<string>;
    lines: any;
};

const create_rect = (x: number, y: number, color: string) => (
    new fabric.Rect({
        left: x,
        top: y,
        fill: color,
        width: VARS.rw,
        height: VARS.rh,
        centeredScaling: true,
        selectable: false,
        cornerStyle: 'circle',
        cornerSize: 50,
        strokeLineJoin: 'round',
    })
);

const create_label = (x: number, y: number, title: string) => (
    new fabric.TextBox(title, {
        left: x,
        top: y + VARS.rh / 3,
        width: VARS.rw,
        fill: COLOR.txt,
        fontFamily: 'sans-serif',
        selectable: false,
        evented: false,
        textAlign: 'center',
        fontSize: VARS.txtSize,
    })
);

const create_node = (inputs: NodeInit, canvas: any) => {
    const node : Node = {
        ...inputs,
        rect: create_rect(inputs.x, inputs.y, inputs.color),
        label: create_label(inputs.x, inputs.y, inputs.title),
        lines: {},
        prereqClasses: [],  // classes that are on the left side
        nextClasses: [],    // classes that are on the right side
    };
    canvas.add(node.rect, node.label);
    canvas.renderAll();
    canvas.sendToBack(node.rect);
    canvas.renderAll();
    VARS.allNodes.title = node;
}

const node_exists = (node: string) => VARS.allNodes.node;

function add_prereq (cur: Node, title: string, canvas: any) {
    cur.prereqClasses.push(title);
    if (!node_exists(title)) {
        const [r, c] = find_prereq_space(cur.c, VARS.spaces);
        const [x, y] = get_node_coords(r, c);
        create_node({x, y, r, c, color, title}, canvas);
    }
    
}