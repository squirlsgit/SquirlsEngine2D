import * as Renderable from './Renderable';
import SceneManager from './SceneManager';
import * as datatypes from './Helpers';

//import { Prefab } from './Prefabs';


export interface queue{
    stack?: Stack<Renderable.IRender>;
    castors?: Stack<Renderable.Castor>;
    operators?: Stack<Renderable.Operator>;
}
export class RenderQueue {
    public scene: SceneManager = null;
    
    public queue: queue = {};
    constructor(scene: SceneManager) {
        this.scene = scene;
        this.queue.stack = new Stack<Renderable.GameObject>(); 
        this.queue.castors = new Stack<Renderable.Castor>();
        this.queue.operators = new Stack<Renderable.Operator>();
    }
    public render() {
        this.queue.stack.render();
        this.queue.castors.render();
        this.queue.castors.render();
    }
}



export type spell = (gameobject: Renderable.GameObject) => void;

export type cast = (poly: Array<datatypes.Position>, spell) => void;

export type pixelOperation = (pixel: Uint8Array, position: datatypes.Position) => void;
export type project = (rays: Array<datatypes.Vector>, pixelOperation) => void;


export class Stack<T extends Renderable.IRender >{
    public Queue: Map<number, Map<T, Renderable.RenderArgs>>;
    constructor() {
        this.Queue = new Map<number, Map<T, Renderable.RenderArgs>>();
    }

    public forEach(callback: (T, RenderArgs) => void): void {
        this.Queue.forEach((value: Map<T, Renderable.RenderArgs>, depth: number) => {
            value.forEach((args: Renderable.RenderArgs, Object: T) => { callback(Object, args); });
        });
    }

    public render(callback: (...args) => void = null) {
        this.forEach((Object: T, args: Renderable.RenderArgs) => {
            if (callback) {
                callback(...Object.render(args));
            } else {
                Object.render(args);
            }
            
        })
    }
    

    protected sort(q: Map<number, any>) {
        return new Map([...q.entries()].sort((a, b) => a[0] - b[0]));
    }

    public add(gameobject: T, depth: number, args: Renderable.RenderArgs = null): boolean {
        try {
            if (!this.Queue.has(depth)) {

                this.Queue.set(depth, new Map([[gameobject, args]]));
                this.Queue = this.sort(this.Queue);
                
            } else {
                let rendering = this.Queue.get(depth);
                rendering.set( gameobject, args);
                
            }
            return true;
        } catch (err) {
            return false;
        }
    }
    public remove(gameobject: T) : boolean{
        try {

            let stack = this.Queue.entries();
            let index = 0;

            while (index < this.Queue.size) {
                if (stack.next().value[1].delete(gameobject)) {
                    return true;
                }
                index++;
            }
            return false;
           
        } catch (err) {
            return false;
        }
    }

    public updateArgs(gameobject: T, args: Renderable.RenderArgs): boolean {
        try {

            let stack = this.Queue.entries();
            let index = 0;

            while (index < this.Queue.size) {
                if (stack.next().value[1].has(gameobject)) {
                    stack.next().value[1].set(gameobject, args);
                    return true;
                }
                index++;
            }
            return false;

        } catch (err) {
            return false;
        }
    }

    public getRender(gameobject: T): Renderable.RenderArgs {
        try {

            let stack = this.Queue.entries();
            let index = 0;

            while (index < this.Queue.size) {
                if (stack.next().value[1].has(gameobject)) {
                    return stack.next().value[1].get(gameobject);
                }
                index++;
            }
            return null;

        } catch (err) {
            return null;
        }
    }
}