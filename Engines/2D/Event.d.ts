import { Scene } from './Scene';
declare type Listener = (context: any, ...args: any[]) => void;
export declare class Event {
    static Events: Map<Scene, Map<EventType, Listener>>;
    static on<T extends Scene, E extends EventType>(listener: Listener): void;
    emit(context: any, ...args: any[]): void;
}
export declare class charge {
    constructor();
}
export declare class ourscene extends Scene {
}
export declare class EventType {
}
export declare class drag extends EventType {
}
export {};
