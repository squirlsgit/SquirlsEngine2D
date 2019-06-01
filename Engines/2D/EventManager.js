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
