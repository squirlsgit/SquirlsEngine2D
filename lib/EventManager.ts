import { Listener } from './Events/Delegates';
import SceneManager  from './SceneManager';

interface Emittance {
    limit: number;
    curr: number;
}

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

    public static add(scene: SceneManager, eventname: string, listener: Listener, limit: number = null): boolean {
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
    public static remove(scene: SceneManager, eventname: string, listener: Listener): boolean {
        try {
            EventManager.Events.get(scene).get(eventname).delete(listener);
            EventManager.Events.get(scene).get(eventname).size == 0 ? EventManager.Events.get(scene).delete(eventname) : null;
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

}

