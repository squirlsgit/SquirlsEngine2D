export class SceneManager {
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
export class Time {
    static get deltaTime() {
        Time.track();
        return Time._deltaTime;
    }
    static get lastFrame() {
        Time.track();
        return Time._lastFrame;
    }
    static track() {
        if (!Time.isTracking) {
            Time.updateTime(new Date());
            Time.isTracking = true;
        }
    }
    static updateTime(now) {
        Time.now = now;
        if (Time._lastFrame == null) {
            Time._lastFrame = now;
            Time._deltaTime = 0;
        }
        else {
            Time._deltaTime = Time.now.getTime() - Time._lastFrame.getTime();
            Time._lastFrame = Time.now;
        }
        Time.id = window.requestAnimationFrame(Time.updateTime);
    }
}
Time.now = null;
Time._lastFrame = null;
Time._deltaTime = 0;
Time.isTracking = false;
export class EventManager {
    static emit(scene, event, context, ...args) {
        if (!EventManager.Events.has(scene) || !EventManager.Events.get(scene).has(event)) {
            return false;
        }
        let listeners = EventManager.Events.get(scene).get(event);
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
    static add(scene, eventname, listener, limit = null) {
        try {
            let events = EventManager.Events.get(scene) || (EventManager.Events.set(scene, new Map()).get(scene));
            let event = events.get(eventname) || (events.set(eventname, new Map())).get(eventname);
            event.set(listener, (limit ? { limit: limit, curr: 0 } : null));
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    static remove(scene, eventname, listener) {
        try {
            EventManager.Events.get(scene).get(eventname).delete(listener);
            EventManager.Events.get(scene).get(eventname).size == 0 ? EventManager.Events.get(scene).delete(eventname) : null;
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}
