import * as Objects from './Renderable';
import SceneManager from './SceneManager';
import * as datatypes from './Helpers/DataTypes/Simple';
export declare class RenderQueue {
    scene: SceneManager;
    queue: {};
    constructor(scene: SceneManager);
}
export declare type spell = (gameobject: Objects.Renderable) => void;
export declare type cast = (poly: Array<datatypes.Position>, spell: any) => void;
export declare type pixelOperation = (pixel: Uint8Array, position: datatypes.Position) => void;
export declare type project = (rays: Array<datatypes.Vector>, pixelOperation: any) => void;
export interface RenderArgs {
    newPos?: datatypes.Position;
    newVelocity?: datatypes.Vector;
    newSprite?: Sprite;
    removeFrame?: number;
    removeSprite?: Sprite;
    newFrame?: number;
    shiftFrame?: number;
    newFrameVelocity?: number;
    shiftDepth?: number;
    newDepthVelocity?: number;
}
export interface Sprite {
    url: string;
    width: number;
    height: number;
    scale: number;
}
export declare class Stack<T extends Objects.IRender> {
    Queue: Map<number, Map<T, RenderArgs>>;
    constructor();
    forEach(callback: (T: any, RenderArgs: any) => void): void;
    render(callback?: (...args: any[]) => void): void;
    protected sort(q: Map<number, any>): Map<number, any>;
    add(gameobject: T, depth: number, args?: RenderArgs): boolean;
    remove(gameobject: T): boolean;
    updateArgs(gameobject: T, args: RenderArgs): boolean;
    getRender(gameobject: T): RenderArgs;
}
