import Updater from './Updater/Updater';
import { id, tickData, Update } from '../interfaces';
export default class Component implements id, Update {
    readonly id: number;
    name: string;
    updater: Updater;
    updatePriority: number | null;
    start(): void;
    stop(): void;
    update(tickData: tickData): void;
}
//# sourceMappingURL=Component.d.ts.map