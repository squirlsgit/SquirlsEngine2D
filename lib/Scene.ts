export class Scene{
    public static instance: Scene;
    public static get Manager() {
        
        return Scene.instance || (Scene.instance = new this());
    }
}