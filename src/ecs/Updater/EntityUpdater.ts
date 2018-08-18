import Entity from '../Entity';
import Component from '../Component';
import Updater from './Updater';
import { updaterReport } from '../../interfaces';

type componentCallback = (component: Component) => boolean;

export default class EntityUpdater {
  constructor(private readonly updater: Updater) {}

  add(entity: Entity): updaterReport[] {
    entity.updater = this.updater;
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
