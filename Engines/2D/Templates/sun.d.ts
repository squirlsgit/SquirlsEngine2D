import { Sprite } from '../GameObjects';
import { Position, Size } from '../Helpers';
import SceneManager from '../SceneManager';
export declare class Sun extends Sprite {
    size: Size;
    lastPosition: Position;
    lastSize: Size;
    constructor(scene: SceneManager, position: Position, size: Size);
    interact(canvas: HTMLCanvasElement, click: MouseEvent): Position;
    setNewPosition(position: Position): void;
    setNewSize(size: Size): void;
    setNewStock(ref: string): void;
    drawSun(): void;
}
