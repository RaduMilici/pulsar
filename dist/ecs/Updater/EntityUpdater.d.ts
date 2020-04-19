import Entity from '../Entity';
import Updater from './Updater';
import { updaterReport } from '../../interfaces';
export default class EntityUpdater {
    private readonly updater;
    private readonly entities;
    constructor(updater: Updater);
    start(): void;
    stop(): void;
    clear(): void;
    add(entity: Entity): updaterReport[];
    remove({ components }: Entity): updaterReport[];
    toggle({ components }: Entity): updaterReport[];
    private loopComponents;
}
//# sourceMappingURL=EntityUpdater.d.ts.map