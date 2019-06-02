import * as datatypes from '../Helpers/DataTypes/Simple';
import SceneManager from '../SceneManager';
import { IRender } from './';
export interface GameObjectConstructor {
    scene?: SceneManager;
    position?: datatypes.Position;
    parent?: GameObject;
}
export declare class GameObject implements IRender {
    scene: SceneManager;
    position: datatypes.Position;
    parent: GameObject;
    children: Map<GameObject, null>;
    constructor(construct: GameObjectConstructor);
    getDestroy(): Array<GameObject>;
    hasChild(child: GameObject): GameObject;
    child: GameObject;
    render(): void;
    protected draw(canvas: HTMLCanvasElement, url: string, dim: datatypes.Size): HTMLImageElement;
    protected undraw(canvas: HTMLCanvasElement, _pos: datatypes.Position, _size: datatypes.Size): void;
    protected ondestroy(): void;
    protected oninit(): void;
    protected onupdate(): void;
}
