import { Listener } from './Events/Delegates';
import SceneManager from './SceneManager';
interface Emittance {
    limit: number;
    curr: number;
}
export declare class EventManager {
    static Events: Map<SceneManager, Map<string, Map<Listener, Emittance>>>;
    static emit(scene: SceneManager, event: string, context: any, ...args: any[]): boolean;
    static add(scene: SceneManager, eventname: string, listener: Listener, limit?: number): boolean;
    static remove(scene: SceneManager, eventname: string, listener: Listener): boolean;
}
export {};
