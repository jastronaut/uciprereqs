export const m = 50;
export interface NodeInit {
	x: number;
	y: number;
	r: number;
	c: number;
	color: string;
	title: string;
}

export interface Node extends NodeInit {
	rect: any;
	label: any;
	prereqClasses: Array<string>;
	nextClasses: Array<string>;
	lines: { [name: string]: any };
}

export const rw: number = 2.5 * m;
export const rh: number = 1.5 * m;
export const wpad: number = 1.5 * m;
export const hpad: number = rh;
export const linew: number = 2;
export const orpadh: number = hpad / 2;
export const orpadw: number = wpad / 2;
export const orw: number = rw + wpad;
export const orh: number = rh + hpad;
// export const rows = Math.floor(canvas.height / (hpad + rh));
export const rows: number = 5;
export const txtSize = rh / 4;

export const nodew = rw + wpad;
export const nodeh = rh + hpad;
