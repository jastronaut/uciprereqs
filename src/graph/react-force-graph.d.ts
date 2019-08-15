declare module 'react-force-graph' {
	export const ForceGraph2D;
	export interface CanvasGraphNode {
		id: string;
		x: number;
		y: number;
		group: number;
		__indexColor: string;
	}
	export interface CanvasGraphLink {
		source: string;
		target: string;
	}
}
