import Component from './Component';
import Entity from './Entity';
declare type addReport = {
    name: string;
    added: boolean;
}[];
declare type removeReport = {
    name: string;
    removed: boolean;
}[];
declare type toggleReport = {
    name: string;
    toggled: boolean;
}[];
export default class Updater {
    private components;
    private running;
    private clock;
    private frameId;
    start(): boolean;
    stop(): boolean;
    clear(): void;
    add(entity: Entity): addReport;
    add(component: Component): boolean;
    remove(entity: Entity): removeReport;
    remove(component: Component): boolean;
    toggle(entity: Entity): toggleReport;
    toggle(component: Component): boolean;
    private addEntity;
    private removeEntity;
    private toggleEntity;
    private addComponent;
    private removeComponent;
    private toggleComponent;
    private pushToQueue;
    private startComponent;
    private update;
}
export {};
//# sourceMappingURL=Updater.d.ts.map