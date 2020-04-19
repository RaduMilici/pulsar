import { updaterReport, tickData } from '../../interfaces';
import Component from '../Component';
import Entity from '../Entity';
export default class Updater {
    onUpdateComplete: Component;
    private components;
    private running;
    private clock;
    private entityUpdater;
    private frameId;
    start(): boolean;
    stop(): boolean;
    clear(): void;
    add(entity: Entity): updaterReport[];
    add(component: Component): boolean;
    remove(entity: Entity): updaterReport[];
    remove(component: Component): boolean;
    toggle(entity: Entity): updaterReport[];
    toggle(component: Component): boolean;
    isUpdatingComponent(component: Component): boolean;
    addComponent(component: Component): boolean;
    removeComponent(component: Component): boolean;
    toggleComponent(component: Component): boolean;
    invoke(component: Component, time: number): void;
    invokeRepeating(component: Component, time: number, times?: number): void;
    getTickData(): tickData;
    private pushToQueue;
    private update;
}
//# sourceMappingURL=Updater.d.ts.map