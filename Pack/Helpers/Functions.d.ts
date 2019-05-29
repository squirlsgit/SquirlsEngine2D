import * as simple from './DataTypes/Simple';
export declare const pos: (canvas: HTMLCanvasElement, p: simple.Position) => {
    x: number;
    y: number;
    y_cartesian: number;
};
export declare const size: (canvas: HTMLCanvasElement, size: simple.Size) => {
    width: number;
    height: number;
};
export declare const vector: (p1: simple.Position, p2: simple.Position) => void;
export declare const line: (p1: simple.Position, p2: simple.Position) => void;
export * from './DataTypes/Simple';
