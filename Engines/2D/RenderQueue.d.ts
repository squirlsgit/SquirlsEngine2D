import * as Renderable from './Renderable';
import SceneManager from './SceneManager';
import * as datatypes from './Helpers';
export interface queue {
    stack?: Stack<Renderable.IRender>;
    castors?: Stack<Renderable.Castor>;
    operators?: Stack<Renderable.Operator>;
}
export declare class RenderQueue {
    scene: SceneManager;
    queue: queue;
    constructor(scene: SceneManager);
    render(): void;
}
export declare type spell = (gameobject: Renderable.GameObject) => void;
export declare type cast = (poly: Array<datatypes.Position>, spell: any) => void;
export declare type pixelOperation = (pixel: Uint8Array, position: datatypes.Position) => void;
export declare type project = (rays: Array<datatypes.Vector>, pixelOperation: any) => void;
export declare class Stack<T extends Renderable.IRender> {
    Queue: Map<number, Map<T, Renderable.RenderArgs>>;
    constructor();
    forEach(callback: (T: any, RenderArgs: any) => void): void;
    render(callback?: (...args: any[]) => void): void;
    protected sort(q: Map<number, any>): Map<number, any>;
    add(gameobject: T, depth: number, args?: Renderable.RenderArgs): boolean;
    remove(gameobject: T): boolean;
    updateArgs(gameobject: T, args: Renderable.RenderArgs): boolean;
    getRender(gameobject: T): Renderable.RenderArgs;
}
