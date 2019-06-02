export class Prefab {
    constructor(Position, gameObject, runnables) {
        this.runnables = [];
    }
    render() {
        this.gameObject.render();
        this.runnables.forEach((run) => {
            run.update();
        });
    }
    setPosition(pos) {
    }
}
