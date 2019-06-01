export default class Time {
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
            Time.startFrame = new Date();
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
            Time._deltaTime = Time.now.getMilliseconds() - Time._lastFrame.getMilliseconds();
            Time._lastFrame = Time.now;
        }
        Time.id = window.requestAnimationFrame(Time.updateTime);
    }
}
Time.now = null;
Time.startFrame = null;
Time._lastFrame = null;
Time._deltaTime = 0;
Time.isTracking = false;
