import * as CONSTS from './constants';

// var canvas = new fabric.Canvas("c");

function get_space_from_coords(x, y) {
    return [Math.floor((x - wpad) / (rw + wpad)), Math.floor((y - hpad) / (rh + hpad))];
}

// canvas.on('mouse:wheel', function(opt) {
//     var delta = opt.e.deltaY;
//     var zoom = canvas.getZoom();
//     zoom = zoom + delta/200;
//     if (zoom > 20) zoom = 20;
//     if (zoom < 0.01) zoom = 0.01;
//     canvas.setZoom(zoom);
//     opt.e.preventDefault();
//     opt.e.stopPropagation();
// });

function animate_highlight(c) {
    console.log(`old value: ${all[c].rect.fill}`);
    var setColor = colorWantToTakeHighlight;
    if (all[c].fill == colorTaken)
        setColor = colorTakenHighlight;
    all[c].rect.animate('fill', setColor, {
        duration: 1000,
        // easing: fabric.util.ease.easeOutElastic,
        // onChange: function() {
        //     all[c].rect.set({fill: setColor});
        //     canvas.renderAll();
        // },
        onChange: canvas.renderAll.bind(canvas)
    });

}

function animate_unhighlight(c, canvas) {
    all[c].rect.animate('fill', all[c].fill, {
        duration: 1000,
        easing: fabric.util.ease.easeOutElastic,
        // onChange: function() {
        //     all[c].rect.set({fill: all[c].fill});
        //     canvas.renderAll();
        // },
        onChange: canvas.renderAll.bind(canvas)
    });
}

function highlight_all(c) {
    if (all[c].fill == colorTaken)
        all[c].rect.set({ fill: colorTakenHighlight });
    else
        all[c].rect.set({ fill: colorWantToTakeHighlight });

    if (all[c].parents.length < 1) {
        return;
    }

    for (var p of all[c].parents) {
        highlight_all(p);
    }
}

// function highlight_all(c) {
//     animate_highlight(c);
//     if (all[c].parents.length < 1) {
//         return;
//     }

//     for (var p of all[c].parents) {
//         highlight_all(p);
//     }
// }

canvas.on('mouse:over', function (opts) {
    if (opts.target.type == 'rect') {
        var r, c;
        [r, c] = get_space_from_coords(opts.target.left, opts.target.top);
        highlight_all(spaces[r][c]);
        canvas.renderAll();
    }
});

function unhighlight_all(c) {
    all[c].rect.set({ fill: all[c].fill });
    // animate_unhighlight(c);
    if (all[c].parents.length < 1) {
        return;
    }

    for (var p of all[c].parents) {
        unhighlight_all(p);
    }
}

// canvas.on('mouse:out', function(opts) {
//     if (opts.target.type == 'rect') {
//         var r, c;
//         [r, c] = get_space_from_coords(opts.target.left, opts.target.top);
//         unhighlight_all(spaces[r][c]);
//         canvas.renderAll();
//     }
// });

function find_next_space(c, r = 0) { // find next space in SAME ROW
    var r = 0;
    while (spaces[c].length > 0) {
        for (var i = 0; i < spaces[c].length; i++) {
            if (spaces[c][i] == '') {
                return [i, c];
            }
        }

        if (spaces[c].length < rows) {
            r = spaces[c].length;
            break;
        }
        c++;
    }
    return [r, c];
}

function shift_spaces_fwd(i = 0) {
    spaces.unshift([]);
    for (var j = i + 1; j < spaces.length; j++) {
        for (var c of spaces[j]) {
            all[c].c++;
            let newX = all[c].x + (rw + wpad);
            all[c].txt.set({ left: newX })
            all[c].txt.setCoords();
            all[c].x = newX;
            all[c].rect.set({ left: newX });
            all[c].rect.setCoords();
        }
    }

    for (var j = i + 1; j < spaces.length; j++) {
        for (var c of spaces[j]) {
            for (var ch in all[c].lines) {
                all[c].lines[ch].set({ left: all[c].x + rw });
                all[c].lines[ch].setCoords();
            }
        }
    }
    canvas.renderAll();
}

function find_prev_space(c) {
    var r = 0;
    while (spaces[c].length > 0) {
        if (spaces[c].length < rows) {
            r = spaces[c].length;
            break;
        }
        c--;
    }

    return [r, c];
}

function make_parent_line(px, py, cx, cy) {
    return new fabric.Line([px + rw, py + rh / 2, cx, cy + rh / 2], {
        fill: linecolor,
        stroke: linecolor,
        strokeWidth: linew,
        selectable: false
    });
}

function makeXY(r, c) {
    reutrn[wpad + c * (rw + wpad), hpad + r * (rh + hpad)];
}

function makeX(c) {
    return wpad + c * (rw + wpad);
}

function makeY(r) {
    return hpad + r * (rh + hpad);
}

function shift_child(cur) {
    if (all[cur].children.length == 0) {
        var r, c;
        [r, c] = find_next_space(all[cur].c + 1);
        all[cur].r = r;
        all[cur].c = c;
        all[cur].set({ left: makeX(c), top: makeY(c) });
    }
}

// class OrGroup {
//     constructor(goal) {
//         this.goal = goal;
//         this.nodes = [];
//         this.rect = new fabric.Rect({
//             left: 0,
//             top: 0,
//             fill: '#aaaaaa',
//             width: orw,
//             height: 0,
//             centeredScaling: true,
//             selectable: false,
//         });
//         canvas.add(this.rect);
//         this.y = 0;
//         this.x = 0;
//     }

//     add_node(c) {
//         this.nodes.push(c);
//         if (all[c].x > (this.x + orpadw))
//             this.x = all[c].x - orpadw;
//         if (all[c].y > (this.y - orpadh))
//             this.y = all[c].y + orpadh;
//         this.rect.set({left: this.x, top: this.y});
//         this.rect.setCoords();
//         canvas.renderAll();
//     }
// }

class Component {
    constructor(id, startR, startC, endR, endC, nodes = []) {
        this.id = id;
        this.nodes = nodes;
        this.startR = startR;
        this.startC = startC;
        this.endR = endR;
        this.endC = endC;
        this.totalSize = (endR - startR) * (endC - startC);
    }

    add_class(c) {
        console.log(`(${this.startR}, ${this.startC}), (${this.startC}, ${this.endC})`);
        this.nodes.push(c);
        if (all[c].r < this.startR)
            this.startR = all[c].r;
        if (all[c].r > this.endR)
            this.endR = all[c].r;
        if (all[c].c < this.startC)
            this.startC = all[c].c;
        if (all[c] > this.endC)
            this.endC = all[c].c;
        console.log(`(${this.startR}, ${this.startC}), (${this.startC}, ${this.endC})`);
        console.log(this.totalSize);
        this.totalSize = (this.endR - this.startR) * (this.endC - this.startC);
        console.log(this.totalSize);
    }

    lock_component() {
        for (var c = this.startC; c <= this.endC; c++) {
            for (var r = this.startR; r <= this.endR; r++) {
                if (!spaces[c][r])
                    spaces[c][r] = 'x';
            }
        }
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
            width: rw,
            height: rh,
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
            top: this.y + rh / 3,
            width: rw,
            fill: txtcolor,
            fontFamily: 'sans-serif',
            selectable: false,
            evented: false,
            textAlign: 'center',
            fontSize: rh / 4
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
        if (!all[child] || all[child].c <= this.c) {
            var r, c;
            [r, c] = find_next_space(this.c + 1);
            var cy = makeY(r);
            var cx = makeX(c);
            if (all[child]) {
                all[child].r = r;
                all[child].c = c;
                all[child].x = cx;
                all[child].y = cy;
                all[child].rect.set({ top: cy, left: cx });
                all[child].rect.setCoords();
                spaces[c][r] = '';
                all[child].txt.set({ top: cy + rh / 4, left: cx });
                all[child].txt.setCoords();
                spaces[c].push(child);
            } else {
                all[child] = new ClassNode(child, cy, cx, r, c);
                spaces[c].push(child);
            }
        } else {
            cx = all[child].x;
            cy = all[child].y;
        }

        all[child].parents.push(this.title);
        this.lines[child] = make_parent_line(this.x, this.y, cx, cy);

        canvas.add(this.lines[child]);
        canvas.sendBackwards(this.lines[child]);
    }

    add_parent(parent) {
        this.parents.push(parent);
        var px, py;
        if (all[parent]) {
            // if (all[parent].c >= this.c) {

            // }
            px = all[parent].x;
            py = all[parent].y;
        } else {
            if (this.c == 0)
                shift_spaces_fwd();

            var r, c;
            [r, c] = find_prev_space(this.c - 1);
            py = hpad + r * (rh + hpad);
            px = wpad + c * (rw + wpad);
            all[parent] = new ClassNode(parent, py, px, r, c);
            spaces[c].push(parent);
        }
        all[parent].children.push(this.title);
        all[parent].lines[this.title] = make_parent_line(px, py, this.x, this.y);
        canvas.sendToBack(all[parent].lines[this.title]);
        canvas.sendBackwards(all[parent].lines[this.title]);
        canvas.add(all[parent].lines[this.title]);
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
    if (!all[title]) {
        var r, c;
        [r, c] = find_next_space(0);
        spaces[c].push(title);
        all[title] = new ClassNode(title, hpad + r * (rh + hpad), wpad + c * (rw + wpad), r, c, color, component);
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
        all[c].add_parent(parent);
        add_goal(parent, goal);
    }
}

const add_classes = (wantToTake: Array<string>, next: any) => {
    // for (var c of wantToTake) {
    //     add_goal(c, c);
    // }

    for (var n in next) {
        all.c.add_child(next[n]);
    }
};

export const init_graph = (wantToTake: Array<string>, next: any, canvas: any) => {
    rows = Math.floor(canvas.height / (hpad + rh));

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
            unhighlight_all(spaces[r][c]);
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