import { Scene } from './Scene';
type Listener = (context: any, ...args) => void;

export class Event
    //<T extends Scene, _EventType extends EventType>
{
    public static Events: Map<Scene, Map<EventType, Listener>> = new Map();
    public static on<T extends Scene, E extends EventType>(listener: Listener) {
        
        //Event.Events.set(_Scene, new Map(Type, listener));
    }
    public emit(context: any, ...args) {
        

    }
    

}

export class charge {
    constructor() {
        var ev = new Event();
        Event.on<charge, EventType>(({ }) => { })
    }
}

export class ourscene extends Scene {

}


export class EventType {

}

export class drag extends EventType {

}