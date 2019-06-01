import { EventManager } from './EventManager';
export default class SceneManager {
    constructor(canvas) {
        this.window = canvas;
    }
    static Module(canvas) {
        return this.instance || (this.instance = new this(canvas));
    }
    on(event, callback, recurrance = null) {
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
        EventManager.add(this, event, callback, recurrance);
    }
    once(event, callback) {
        return EventManager.add(this, event, callback, null);
    }
    remove(event, callback) {
        return EventManager.remove(this, event, callback);
    }
    emit(event, context, ...args) {
        return EventManager.emit(this, event, context, args);
    }
}
