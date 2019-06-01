
export default class Time {
    public static id;
    public static now: Date = null;
    public static startFrame: Date = null;
    public static _lastFrame: Date = null;
    public static _deltaTime: number = 0;
    public static isTracking: boolean = false;

    public static get deltaTime(): number {
        Time.track();
        return Time._deltaTime;
    }
    public static get lastFrame(): Date {
        Time.track();
        return Time._lastFrame;
    }

    public static track() {
        if (!Time.isTracking) {
            Time.updateTime(new Date());
            Time.startFrame = new Date();
            Time.isTracking = true;
        }
    }
    public static updateTime(now) {
        Time.now = now;
        if (Time._lastFrame == null) {
            Time._lastFrame = now;
            Time._deltaTime = 0;
        } else {
            Time._deltaTime = Time.now.getMilliseconds() - Time._lastFrame.getMilliseconds();
            Time._lastFrame = Time.now;
        }

        Time.id = window.requestAnimationFrame(Time.updateTime);
    }

}
