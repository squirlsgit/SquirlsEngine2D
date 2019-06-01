import * as Objects from './Renderable';
import SceneManager from './SceneManager';
import * as datatypes from './Helpers/DataTypes/Simple';
import { IRender } from './Renderable';

export class RenderQueue {
    public scene: SceneManager = null;

    public queue: { };
    constructor(scene: SceneManager) {
        this.scene = scene;
        this.queue['stack'] = new Stack<Objects.Sprite>(); 
        this.queue['castors'] = new Stack<Objects.Castor>();
    }
}



export type spell = (gameobject: Objects.Renderable) => void;

export type cast = (poly: Array<datatypes.Position>, spell) => void;

export type pixelOperation = (pixel: Uint8Array, position: datatypes.Position) => void;
export type project = (rays: Array<datatypes.Vector>, pixelOperation) => void;



// Render Arguments is a way to update GameObjects without direct access to them.
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


export class Stack<T extends Objects.IRender >{
    public Queue: Map<number, Map<T, RenderArgs>>;
    constructor() {
        this.Queue = new Map<number, Map<T, RenderArgs>>();
    }

    public forEach(callback: (T, RenderArgs) => void): void {
        this.Queue.forEach((value: Map<T, RenderArgs>, depth: number) => {
            value.forEach((args: RenderArgs, Object: T) => { callback(Object, args); });
        });
    }

    public render(callback: (...args) => void = null) {
        this.forEach((Object: T, args: RenderArgs) => {
            if (callback) {
                callback(...Object.render(args));
            } else {
                Object.render(args);
            }
            
        })
    }
    

    protected sort(q: Map<number, any>) {
        return new Map([...q.entries()].sort());
    }

    public add(gameobject: T, depth: number, args: RenderArgs = null): boolean {
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

    public updateArgs(gameobject: T, args: RenderArgs): boolean {
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

    public getRender(gameobject: T): RenderArgs {
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