import { Position, Size } from "../Helpers/Functions";
import { IRender } from './Renderable';
export declare class Sprite implements IRender {
    startAt: Position;
    objectRef: string;
    constructor(position: Position, objectRef: string);
    render(): void;
    draw(canvas: HTMLCanvasElement, dim: Size): void;
    undraw(canvas: HTMLCanvasElement, _pos: Position, _size: Size): void;
}
