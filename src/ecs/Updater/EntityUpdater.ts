import Entity from '../Entity';
import Component from '../Component';
import Updater from './Updater';
import { updaterReport } from '../../interfaces';

type componentCallback = (component: Component) => boolean;

export default class EntityUpdater {
  private readonly entities: Entity[] = [];

  constructor(private readonly updater: Updater) {}

  start(): void {
    this.entities.forEach((entity: Entity) => entity.start());
  }

  stop(): void {
    this.entities.forEach((entity: Entity) => entity.stop());
  }

  clear(): void {
    this.entities.length = 0;
  }

  add(entity: Entity): updaterReport[] {
    entity.updater = this.updater;
    this.entities.push(entity);
    const callback: componentCallback = (component: Component) => {
      component.entity = entity;
      return this.updater.addComponent(component);
    };
    return this.loopComponents(entity.components, callback);
  }

  remove({ components }: Entity): updaterReport[] {
    const callback: componentCallback = component =>
      this.updater.removeComponent(component);
    return this.loopComponents(components, callback);
  }

  toggle({ components }: Entity): updaterReport[] {
    const callback: componentCallback = component =>
      this.updater.toggleComponent(component);
    return this.loopComponents(components, callback);
  }

  private loopComponents(
    components: Component[],
    callback: componentCallback
  ): updaterReport[] {
    return components.map((component: Component) => {
      return {
        id: component.id,
        name: component.name,
        success: callback(component),
      };
    });
  }
}
