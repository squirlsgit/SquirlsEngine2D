export class SceneManager {
   
    public static instance: SceneManager;
    public window: HTMLCanvasElement;
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

export class Time {
    public static id;
    public static now: Date = null;
    public static _lastFrame: Date = null;
    public static _deltaTime: number = 0;
    public static isTracking: boolean = false;
    
    public static get deltaTime(): number{
        Time.track();
        return Time._deltaTime;
    }
    public static get lastFrame(): Date {
        Time.track();
        return Time._lastFrame;
    }

    public static track() {
        if (!Time.isTracking) {
            Time.updateTime(new Date());
            Time.isTracking = true;
        }
    }
    public static updateTime(now) {
        Time.now = now;
        if (Time._lastFrame == null) {
            Time._lastFrame = now;
            Time._deltaTime = 0;
        } else {
            Time._deltaTime = Time.now.getTime() - Time._lastFrame.getTime();
            Time._lastFrame = Time.now;
        }

        Time.id = window.requestAnimationFrame(Time.updateTime);
    }

}





export interface Emittance {
    limit: number;
    curr: number;
}
export type Listener = (context: any, ...args) => void;


export class EventManager {
    public static Events: Map<SceneManager, Map<string, Map<Listener, Emittance>>>; 
    public static emit(scene: SceneManager, event: string, context: any, ...args): boolean {
        if (!EventManager.Events.has(scene) || !EventManager.Events.get(scene).has(event)) {
            return false;
        }
        let listeners: Map<Listener, Emittance> = EventManager.Events.get(scene).get(event);
        listeners.forEach((stance, callback) => {
            if (stance == null || stance.limit > stance.curr) {
                callback(context, args);
                if (stance) {
                    stance.curr++;
                }
                return;
            }
            EventManager.Events.get(scene).get(event).delete(callback);
        });
        return true;
        
    }

    public static add(scene: SceneManager, eventname: string, listener: Listener, limit: number = null): boolean{
        try {
            let events: Map<string, Map<Listener, Emittance>> = EventManager.Events.get(scene) || (EventManager.Events.set(
                scene,
                new Map<string, Map<Listener, Emittance>>()).get(scene)
            );
            let event: Map<Listener, Emittance> = events.get(eventname) || (events.set(eventname, new Map<Listener, Emittance>())).get(eventname);

            event.set(listener, (limit ? { limit: limit, curr: 0 } : null));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
        
    }
    public static remove(scene: SceneManager, eventname: string, listener: Listener) : boolean {
        try {
            EventManager.Events.get(scene).get(eventname).delete(listener);
            EventManager.Events.get(scene).get(eventname).size == 0 ? EventManager.Events.get(scene).delete(eventname): null;
        } catch (err) {
            console.error(err);
        }
    }

}

