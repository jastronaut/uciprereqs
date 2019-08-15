import * as VARS from './constants';

/**
 *
 * @param c column number where current node is
 * @param spaces spaces array to keep track of node positions
 */
export const find_prereq_space = (c: number, spaces: Array<Array<string>>) => {
	c--;
	while (spaces[c].length > 0) {
		if (spaces[c].length < VARS.rows) {
			return [spaces[c].length, c];
		}
		c--;
	}

	return [0, 0];
};

export const find_next_space = (
	c: number,
	r: number,
	spaces: Array<Array<string>>
) => {
	while (spaces[c].length > 0) {
		for (var i = 0; i < spaces[c].length; i++) {
			if (!spaces[c][i] || spaces[c][i] === '') return [i, c];
		}
		if (spaces[c].length < VARS.rows) return [spaces[c].length, c];
		c++;
	}
	return [0, 0];
};

/**
 *
 * @param r row number
 * @param c column number
 */
export const get_node_coords = (r: number, c: number) => [
	VARS.wpad + c * VARS.nodew,
	VARS.hpad + r * VARS.nodew,
];

export const shift_fwd = (
	spaces: Array<Array<string>>,
	allNodes: { [name: string]: VARS.Node },
	canvas: any
) => {
	for (const col of spaces) {
		col.forEach(cur => {
			allNodes[cur].c++;
			const newX = allNodes[cur].x + VARS.nodew;
			allNodes[cur].label.set({ left: newX });
			allNodes[cur].rect.set({ left: newX });
			allNodes[cur].x = newX;
			allNodes[cur].label.setCoords();
			allNodes[cur].rect.setCoords();
		});
	}
	spaces.unshift([]);
	canvas.renderAll();
};
