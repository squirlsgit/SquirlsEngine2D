export declare class SceneManager {
    static instance: SceneManager;
    window: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    static Module(canvas: HTMLCanvasElement): SceneManager;
    on(event: string, callback: Listener, recurrance?: string | number): void;
    once(event: string, callback: Listener): boolean;
    remove(event: string, callback: Listener): boolean;
    emit(event: string, context: any, ...args: any[]): boolean;
}
export declare class Time {
    static id: any;
    static now: Date;
    static _lastFrame: Date;
    static _deltaTime: number;
    static isTracking: boolean;
    static readonly deltaTime: number;
    static readonly lastFrame: Date;
    static track(): void;
    static updateTime(now: any): void;
}
export interface Emittance {
    limit: number;
    curr: number;
}
export declare type Listener = (context: any, ...args: any[]) => void;
export declare class EventManager {
    static Events: Map<SceneManager, Map<string, Map<Listener, Emittance>>>;
    static emit(scene: SceneManager, event: string, context: any, ...args: any[]): boolean;
    static add(scene: SceneManager, eventname: string, listener: Listener, limit?: number): boolean;
    static remove(scene: SceneManager, eventname: string, listener: Listener): boolean;
}
