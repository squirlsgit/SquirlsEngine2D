export class Scene {
    static get Manager() {
        return Scene.instance || (Scene.instance = new this());
    }
}
