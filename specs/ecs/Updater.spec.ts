import { Updater, Component, GameObject } from '../../src/ecs';
import SpecGameObject from './fixtures/SpecGameObject';

describe('ecs / Updater', () => {
  it('should start only once', () => {
    const updater: Updater = new Updater();
    const start1: boolean = updater.start();
    const start2: boolean = updater.start();

    updater.stop();

    expect(start1).toBe(true);
    expect(start2).toBe(false);
  });

  it('should stop only once', () => {
    const updater: Updater = new Updater();

    updater.start();

    const stop1: boolean = updater.stop();
    const stop2: boolean = updater.stop();

    expect(stop1).toBe(true);
    expect(stop2).toBe(false);
  });

  it('should stop when calling clear', () => {
    const updater: Updater = new Updater();

    updater.start();
    updater.clear();

    const stop: boolean = updater.stop();
    expect(stop).toBe(false);
  });

  it('should only add a component once', () => {
    const updater: Updater = new Updater();
    const gameObject: GameObject = new SpecGameObject();

    const add1: boolean = updater.add(gameObject);
    const add2: boolean = updater.add(gameObject);

    expect(add1).toBe(true);
    expect(add2).toBe(false);
  });

  // it("should only add an entity's components once", () => {
  //   const updater: Updater = new Updater();
  //   const entity: SpecEntity = new SpecEntity();

  //   const add1: updaterReport[] = updater.add(entity);
  //   const add2: updaterReport[] = updater.add(entity);

  //   const successful: any[] = [{ name: 'SpecComponent', success: true }];
  //   const unsuccessful: any[] = [{ name: 'SpecComponent', success: false }];

  //   expect(add1).toMatchObject(successful);
  //   expect(add2).toMatchObject(unsuccessful);
  // });

  it('should only remove a component once', () => {
    const updater: Updater = new Updater();
    const gameObject: GameObject = new SpecGameObject();

    updater.add(gameObject);

    const remove1: boolean = updater.remove(gameObject);
    const remove2: boolean = updater.remove(gameObject);

    expect(remove1).toBe(true);
    expect(remove2).toBe(false);
  });

  // it("should only remove an entity's components once", () => {
  //   const updater: Updater = new Updater();
  //   const entity: SpecEntity = new SpecEntity();

  //   updater.add(entity);

  //   const remove1: updaterReport[] = updater.remove(entity);
  //   const remove2: updaterReport[] = updater.remove(entity);

  //   const successful: any[] = [{ name: 'SpecComponent', success: true }];
  //   const unsuccessful: any[] = [{ name: 'SpecComponent', success: false }];

  //   expect(remove1).toMatchObject(successful);
  //   expect(remove2).toMatchObject(unsuccessful);
  // });

  // it('should know if a component is being updated', () => {
  //   const updater: Updater = new Updater();
  //   const component: Component = new SpecComponent();
  //   const gameObject: GameObject = new SpecGameObject();

  //   updater.add(gameObject);

  //   const isUpdated: boolean = updater.isUpdatingComponent(component);

  //   updater.remove(component);

  //   const isNotUpdated: boolean = updater.isUpdatingComponent(component);

  //   expect(isUpdated).toBe(true);
  //   expect(isNotUpdated).toBe(false);
  // });

  // it('should update components using a priority number', () => {
  //   const updater: Updater = new Updater();
  //   const entity: Entity = new Entity();
  //   const component0: Component = new SpecComponent(); // update priority 0
  //   const component1: Component = new Priority1Component(); // update priority 1

  //   let time0: number = null;
  //   let time1: number = null;

  //   component0.update = () => {
  //     time0 = performance.now();
  //   };

  //   component1.update = () => {
  //     time1 = performance.now();
  //   };

  //   entity.components.push(component0, component1);

  //   updater.add(entity);
  //   updater.start();
  //   updater.stop();

  //   expect(time0).toBeLessThan(time1);
  // });
});
