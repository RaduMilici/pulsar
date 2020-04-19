import Component from './Component';
import Updater from './Updater/Updater';
import { id } from '../interfaces';
export default class Entity implements id {
    id: number;
    name: string;
    updater: Updater;
    readonly components: Component[];
    start(): void;
    stop(): void;
}
//# sourceMappingURL=Entity.d.ts.map