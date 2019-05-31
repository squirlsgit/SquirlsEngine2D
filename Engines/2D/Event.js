import { Scene } from './Scene';
export class Event {
    static on(listener) {
        //Event.Events.set(_Scene, new Map(Type, listener));
    }
    emit(context, ...args) {
    }
}
Event.Events = new Map();
export class charge {
    constructor() {
        var ev = new Event();
        Event.on(({}) => { });
    }
}
export class ourscene extends Scene {
}
export class EventType {
}
export class drag extends EventType {
}
