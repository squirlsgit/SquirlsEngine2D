export class RenderQueue {
    constructor(scene) {
        this.scene = null;
        this.scene = scene;
        this.queue['stack'] = new Stack();
        this.queue['castors'] = new Stack();
    }
}
export class Stack {
    constructor() {
        this.Queue = new Map();
    }
    forEach(callback) {
        this.Queue.forEach((value, depth) => {
            value.forEach((args, Object) => { callback(Object, args); });
        });
    }
    render(callback = null) {
        this.forEach((Object, args) => {
            if (callback) {
                callback(...Object.render(args));
            }
            else {
                Object.render(args);
            }
        });
    }
    sort(q) {
        return new Map([...q.entries()].sort());
    }
    add(gameobject, depth, args = null) {
        try {
            if (!this.Queue.has(depth)) {
                this.Queue.set(depth, new Map([[gameobject, args]]));
                this.Queue = this.sort(this.Queue);
            }
            else {
                let rendering = this.Queue.get(depth);
                rendering.set(gameobject, args);
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    remove(gameobject) {
        try {
            let stack = this.Queue.entries();
            let index = 0;
            while (index < this.Queue.size) {
                if (stack.next().value[1].delete(gameobject)) {
                    return true;
                }
                index++;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    }
    updateArgs(gameobject, args) {
        try {
            let stack = this.Queue.entries();
            let index = 0;
            while (index < this.Queue.size) {
                if (stack.next().value[1].has(gameobject)) {
                    stack.next().value[1].set(gameobject, args);
                    return true;
                }
                index++;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    }
    getRender(gameobject) {
        try {
            let stack = this.Queue.entries();
            let index = 0;
            while (index < this.Queue.size) {
                if (stack.next().value[1].has(gameobject)) {
                    return stack.next().value[1].get(gameobject);
                }
                index++;
            }
            return null;
        }
        catch (err) {
            return null;
        }
    }
}
