export declare class Renderable {
    render(): void;
}
export declare class IRender {
    render?: (...args: any[]) => any;
    ops?: (...args: any[]) => any;
}
