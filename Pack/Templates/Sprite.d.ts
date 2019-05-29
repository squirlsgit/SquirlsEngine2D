import { Position, Size } from "../Helpers/Functions";
export declare class Sprite {
    startAt: Position;
    objectRef: string;
    constructor(position: Position, objectRef: string);
    draw(canvas: HTMLCanvasElement, dim: Size): void;
    undraw(canvas: HTMLCanvasElement, _pos: Position, _size: Size): void;
}
