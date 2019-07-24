import * as COLOR from './colors';
import * as VARS from './constants';
import * as SPACES from './spacehelpers';
const fabric = require('fabric').fabric;

const allNodes: { [name: string]: VARS.Node } = {};
const spaces: Array<Array<string>> = [[], [], [], []];

const color = COLOR.needToTake;
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
    new fabric.Textbox(title, {
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

const create_line = (x0: number, y0: number, x1: number, y1: number) => (
    new fabric.Line(
        [
            x0 + VARS.rw,
            y0 + VARS.rh / 2,
            x1,
            y1 + VARS.rh / 2
        ],
        {
            fill: COLOR.line,
            stroke: COLOR.line,
            strokeWidth: VARS.linew,
            selectable: false,
        }
    )
);

const create_node = (inputs: VARS.NodeInit, canvas: any) => {
    const node : VARS.Node = {
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
    allNodes[inputs.title] = node;
}

const node_exists = (node: string) => allNodes[node];

function add_prereq (curClass: string, toAdd: string, canvas: any) {
    const cur = allNodes[curClass];
    cur.prereqClasses.push(toAdd);

    if (!node_exists(toAdd)) {
        if (cur.c === 0)
            SPACES.shift_fwd(spaces, allNodes, canvas);
        const [r, c] = SPACES.find_prereq_space(cur.c, spaces);
        const [x, y] = SPACES.get_node_coords(r, c);
        create_node({x, y, r, c, color, title: toAdd}, canvas);
        spaces[c].push(toAdd);
    }

    const prereq = allNodes[toAdd];

    prereq.nextClasses.push(cur.title);
    prereq.lines.curClass = create_line(prereq.x, prereq.y, cur.x, cur.y);

    canvas.sendToBack(prereq.lines.curClass);
    canvas.sendBackwards(prereq.lines.curClass);
    canvas.add(prereq.lines.curClass);
}

function add_orphan (title: string, canvas: any) {
    if (!node_exists(title)) {
        const [r, c] = SPACES.find_next_space(0, 0, spaces);
        console.log(`r: ${r}, c: ${c}`);
        const [x, y] = SPACES.get_node_coords(r, c);
        spaces[c].push(title);
        create_node({x, y, r, c, color, title}, canvas);
    }
}

function add_goal (curClass: string, goal: string, prereqsDirectory: { [name: string] : Array<string> }, canvas: any) {
    add_orphan(curClass, canvas);
    if (!prereqsDirectory[curClass] || prereqsDirectory[curClass].length === 0) return;

    prereqsDirectory[curClass].forEach(prereq => {
        console.log(`adding ${curClass}`);
        add_prereq(curClass, prereq, canvas);
        add_goal(prereq, goal, prereqsDirectory, canvas);
    });

}

export const init_graph = (wantToTake: string, prereqsDirectory: { [name: string] : Array<string> }, canvas: any) => {
    canvas.on('mouse:wheel', function (opt: any) {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom = zoom + delta / 200;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.setZoom(zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });

    add_goal(wantToTake, wantToTake, prereqsDirectory, canvas);

}