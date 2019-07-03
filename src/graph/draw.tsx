import * as VARS from './constants';
import * as COLOR from './colors';

function get_space_from_coords(x: number, y: number) {
    return [Math.floor((x - VARS.wpad) / (VARS.rw + VARS.wpad)), Math.floor((y - VARS.hpad) / (VARS.rh + VARS.hpad))];
}

function find_next_space(c, r = 0) { // find next space in SAME ROW
    var r = 0;
    while (VARS.spaces[c].length > 0) {
        for (var i = 0; i < VARS.spaces[c].length; i++) {
            if (VARS.spaces[c][i] == '') {
                return [i, c];
            }
        }

        if (VARS.spaces[c].length < VARS.rows) {
            r = VARS.spaces[c].length;
            break;
        }
        c++;
    }
    return [r, c];
}

function shift_spaces_fwd(i = 0) {
    VARS.spaces.unshift([]);
    for (var j = i + 1; j < VARS.spaces.length; j++) {
        for (var c of VARS.spaces[j]) {
            VARS.allNodes[c].c++;
            let newX = VARS.allNodes[c].x + (VARS.rw + VARS.wpad);
            VARS.allNodes[c].txt.set({ left: newX })
            VARS.allNodes[c].txt.setCoords();
            VARS.allNodes[c].x = newX;
            VARS.allNodes[c].rect.set({ left: newX });
            VARS.allNodes[c].rect.setCoords();
        }
    }

    for (var j = i + 1; j < VARS.spaces.length; j++) {
        for (var c of VARS.spaces[j]) {
            for (var ch in VARS.allNodes[c].lines) {
                VARS.allNodes[c].lines[ch].set({ left: VARS.allNodes[c].x + VARS.rw });
                VARS.allNodes[c].lines[ch].setCoords();
            }
        }
    }
    canvas.renderAll();
}

function find_prev_space(c) {
    var r = 0;
    while (VARS.spaces[c].length > 0) {
        if (VARS.spaces[c].length < VARS.rows) {
            r = VARS.spaces[c].length;
            break;
        }
        c--;
    }

    return [r, c];
}

function make_parent_line(px, py, cx, cy) {
    return new fabric.Line([px + VARS.rw, py + VARS.rh / 2, cx, cy + VARS.rh / 2], {
        fill: linecolor,
        stroke: linecolor,
        strokeWidth: linew,
        selectable: false
    });
}

function makeXY(r: number, c) {
    return [VARS.wpad + c * (VARS.rw + VARS.wpad), VARS.hpad + r * (VARS.rh + VARS.hpad)];
}

function makeX(c) {
    return VARS.wpad + c * (VARS.rw + VARS.wpad);
}

function makeY(r) {
    return VARS.hpad + r * (VARS.rh + VARS.hpad);
}

function shift_child(cur) {
    if (VARS.allNodes[cur].children.length == 0) {
        var r, c;
        [r, c] = find_next_space(VARS.allNodes[cur].c + 1);
        VARS.allNodes[cur].r = r;
        VARS.allNodes[cur].c = c;
        VARS.allNodes[cur].set({ left: makeX(c), top: makeY(c) });
    }
}

class ClassNode {
    constructor(title, top, left, r, c, color = colorTaken, component = 'x') {
        this.component = component;
        this.title = title;
        this.parents = [];
        this.children = [];
        this.r = r;
        this.c = c;
        this.rect = new fabric.Rect({
            left: left,
            top: top,
            fill: color,
            width: VARS.rw,
            height: VARS.rh,
            centeredScaling: true,
            selectable: false,
            cornerStyle: 'circle',
            cornerSize: 50,
            strokeLineJoin: 'round'
        });
        this.fill = color;
        this.x = left;
        this.y = top;
        this.txt = new fabric.Textbox(title, {
            left: this.x,
            top: this.y + VARS.rh / 3,
            width: VARS.rw,
            fill: txtcolor,
            fontFamily: 'sans-serif',
            selectable: false,
            evented: false,
            textAlign: 'center',
            fontSize: VARS.rh / 4
        });
        this.lines = {};
        canvas.add(this.rect, this.txt);
        canvas.renderAll();
        canvas.sendToBack(this.rect);
        canvas.renderAll();
    }

    add_child(child) {
        this.children.push(child);
        var cx, cy;
        if (!VARS.allNodes[child] || VARS.allNodes[child].c <= this.c) {
            var r, c;
            [r, c] = find_next_space(this.c + 1);
            var cy = makeY(r);
            var cx = makeX(c);
            if (VARS.allNodes[child]) {
                VARS.allNodes[child].r = r;
                VARS.allNodes[child].c = c;
                VARS.allNodes[child].x = cx;
                VARS.allNodes[child].y = cy;
                VARS.allNodes[child].rect.set({ top: cy, left: cx });
                VARS.allNodes[child].rect.setCoords();
                VARS.spaces[c][r] = '';
                VARS.allNodes[child].txt.set({ top: cy + VARS.rh / 4, left: cx });
                VARS.allNodes[child].txt.setCoords();
                VARS.spaces[c].push(child);
            } else {
                VARS.allNodes[child] = new ClassNode(child, cy, cx, r, c);
                VARS.spaces[c].push(child);
            }
        } else {
            cx = VARS.allNodes[child].x;
            cy = VARS.allNodes[child].y;
        }

        VARS.allNodes[child].parents.push(this.title);
        this.lines[child] = make_parent_line(this.x, this.y, cx, cy);

        canvas.add(this.lines[child]);
        canvas.sendBackwards(this.lines[child]);
    }

    add_parent(parent) {
        this.parents.push(parent);
        var px, py;
        if (VARS.allNodes[parent]) {
            // if (VARS.allNodes[parent].c >= this.c) {

            // }
            px = VARS.allNodes[parent].x;
            py = VARS.allNodes[parent].y;
        } else {
            if (this.c == 0)
                shift_spaces_fwd();

            var r, c;
            [r, c] = find_prev_space(this.c - 1);
            py = VARS.hpad + r * (VARS.rh + VARS.hpad);
            px = VARS.wpad + c * (VARS.rw + VARS.wpad);
            VARS.allNodes[parent] = new ClassNode(parent, py, px, r, c);
            VARS.spaces[c].push(parent);
        }
        VARS.allNodes[parent].children.push(this.title);
        VARS.allNodes[parent].lines[this.title] = make_parent_line(px, py, this.x, this.y);
        canvas.sendToBack(VARS.allNodes[parent].lines[this.title]);
        canvas.sendBackwards(VARS.allNodes[parent].lines[this.title]);
        canvas.add(VARS.allNodes[parent].lines[this.title]);
    }

    info() {
        return this.title + ': Children: ' + this.children.length.toString() + ' Parents: ' + this.parents.length.toString() + ' X: ' + this.x.toString() + ' Y: ' + this.y.toString() + '\n';
    }
}

classes = {
    "ICS 51": ["ICS 31", "ICS 6B"],
    "ICS 53": ["ICS 51"],
    'CS 111': ['ICS 46', 'ICS 6D', 'MATH 3A', 'ICS 6N'],
    'ICS 46': ['ICS 45C'],
    'ICS 45C': ['ICS 33'],
    'ICS 33': ['ICS 32'],
    'ICS 32': ['ICS 31'],
    'ICS 6D': ['ICS 6B'],
    'ICS 6N': ['ICS 00']
    // 'CS 134': ['CS 122A', 'CS 132', 'CS 143A', 'ICS 6D'],
    // 'CS 143A': ['ICS 46', 'ICS 51']
    // 'CS 122A': ['ICS 33'],
    // 'CS 132': ['STATS 67'],
    // 'STATS 67': ['MATH 2B']
}

wantToTake = [
    "CS 111",
    // "CS 134"
]
taken = ['ICS 32', 'ICS 31', 'STATS 67']

next = {
}

orGroups = {};

components = {}
function add_orphan(title, color, component = 'x') {
    if (!VARS.allNodes[title]) {
        var r, c;
        [r, c] = find_next_space(0);
        VARS.spaces[c].push(title);
        VARS.allNodes[title] = new ClassNode(title, VARS.hpad + r * (VARS.rh + VARS.hpad), VARS.wpad + c * (VARS.rw + VARS.wpad), r, c, color, component);
    }
    return title;
}

function get_color(c) {
    if (taken.indexOf(c) >= 0)
        return colorTaken;
    if (wantToTake.indexOf(c) >= 0)
        return colorWantToTake;
    // console.log("need tot take");
    return colorNeedToTake;
}

function add_goal(c, goal) {
    curcolor = get_color(c);
    add_orphan(c, curcolor, goal);
    if (!classes[c] || classes[c].length == 0) {
        // add_orphan(c, curcolor, goal);
        // components[goal].add_class(c);
        // components[goal].lock_component();
        return;
    }

    // add_orphan(c, curcolor, goal);
    // components[goal].add_class(c);
    for (var parent of classes[c]) {
        VARS.allNodes[c].add_parent(parent);
        add_goal(parent, goal);
    }
}

const add_classes = (wantToTake: Array<string>, next: any) => {
    // for (var c of wantToTake) {
    //     add_goal(c, c);
    // }

    for (var n in next) {
        VARS.allNodes.c.add_child(next[n]);
    }
};

export const init_graph = (wantToTake: Array<string>, next: any, canvas: any) => {
    VARS.rows = Math.floor(canvas.height / (VARS.hpad + VARS.rh));

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

    canvas.on('mouse:out', function (opts: any) {
        if (opts.target.type == 'rect') {
            const [r, c] = get_space_from_coords(opts.target.left, opts.target.top);
            unhighlight_all(VARS.spaces[r][c]);
            canvas.renderAll();
        }
    }
    );
    add_classes(wantToTake, next);
};


/*
    - implement box for "or" classes
    - click on class to collapse prereqs
    - place prereq on same row or lower
    -
*/