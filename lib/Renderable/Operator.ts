import { IRender } from './';
import SceneManager from '../SceneManager';
import { Position } from '../Helpers';

export class Operator implements IRender {
    public scene: SceneManager;
    public position: Position;
    public render() {}
}