import { Sprite } from '../Renderable/Sprite';
import { Position, Size } from '../Helpers/Functions';
export declare class Sun extends Sprite {
    size: Size;
    lastPosition: Position;
    lastSize: Size;
    constructor(position: Position, size: Size);
    interact(canvas: HTMLCanvasElement, click: MouseEvent): Position;
    setNewPosition(position: Position): void;
    setNewSize(size: Size): void;
    setNewStock(ref: string): void;
    drawSun(canvas: HTMLCanvasElement): void;
}
