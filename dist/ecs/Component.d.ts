import Updater from './Updater/Updater';
import { id, tickData, Update } from '../interfaces';
import Entity from './Entity';
export default class Component implements id, Update {
    readonly id: number;
    name: string;
    updater: Updater;
    entity: Entity;
    updatePriority: number | null;
    start(): void;
    stop(): void;
    update(tickData: tickData): void;
}
//# sourceMappingURL=Component.d.ts.map