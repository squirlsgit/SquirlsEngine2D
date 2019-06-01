
import { EventManager } from './EventManager';
import { Listener } from './Events/Delegates';
import { GameObject } from './Renderable';
export default class SceneManager {
   
    public static instance: SceneManager;
    public window: HTMLCanvasElement;
    public prefabs: Array<GameObject>;
    constructor(canvas: HTMLCanvasElement) {
        this.window = canvas;
    }
    public static Module(canvas: HTMLCanvasElement) {
        return this.instance || (this.instance = new this(canvas));
    }

    public on(event: string, callback: Listener, recurrance: string | number = null) {
        if (typeof (recurrance) == 'string') {
            switch (recurrance) {
                case 'once':
                    recurrance = 1;
                    break;
                case 'twice':
                    recurrance = 2;
                    break;
            }
        }
        EventManager.add(this, event, callback, <number>recurrance);
    }
    
    public once(event: string, callback: Listener): boolean {
        return EventManager.add(this, event, callback, null);
    }
    public remove(event: string, callback: Listener): boolean {
        return EventManager.remove(this, event, callback);
    }
    public emit(event: string, context: any, ...args) {
        return EventManager.emit(this, event, context, args);
    }

       
}