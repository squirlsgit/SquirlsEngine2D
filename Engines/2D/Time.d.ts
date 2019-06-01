export default class Time {
    static id: any;
    static now: Date;
    static startFrame: Date;
    static _lastFrame: Date;
    static _deltaTime: number;
    static isTracking: boolean;
    static readonly deltaTime: number;
    static readonly lastFrame: Date;
    static track(): void;
    static updateTime(now: any): void;
}
