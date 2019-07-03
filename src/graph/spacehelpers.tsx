import * as VARS from './constants';

/**
 * 
 * @param c column number where current node is
 * @param spaces spaces array to keep track of node positions
 */
export const find_prereq_space = (c: number, spaces: any) => {
    c--;
    while (spaces.c.length > 0) {
        if (spaces.c.length < VARS.rows) {
            return [spaces.c.length, c];
        }
        c--;
    }

    return [-1, -1];
};

/**
 * 
 * @param r row number
 * @param c column number
 */
export const get_node_coords = (r: number, c: number) => (
    [VARS.wpad + c * VARS.nodew, VARS.hpad + r * VARS.nodew]
);

