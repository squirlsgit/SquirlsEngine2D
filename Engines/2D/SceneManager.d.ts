import { Listener } from './Events/Delegates';
export default class SceneManager {
    static instance: SceneManager;
    window: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    static Module(canvas: HTMLCanvasElement): SceneManager;
    on(event: string, callback: Listener, recurrance?: string | number): void;
    once(event: string, callback: Listener): boolean;
    remove(event: string, callback: Listener): boolean;
    emit(event: string, context: any, ...args: any[]): boolean;
}
