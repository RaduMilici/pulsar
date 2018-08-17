import { Updater, Component } from '../../src/ecs';
import { updaterReport } from '../../src/interfaces';
import SpecEntity from './fixtures/Entity';

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
    const component: Component = new Component();

    const add1: boolean = updater.add(component);
    const add2: boolean = updater.add(component);

    expect(add1).toBe(true);
    expect(add2).toBe(false);
  });

  it("should only add an entity's components once", () => {
    const updater: Updater = new Updater();
    const entity: SpecEntity = new SpecEntity();

    const add1: updaterReport[] = updater.add(entity);
    const add2: updaterReport[] = updater.add(entity);

    const successful: any[] = [{ name: 'SpecComponent', success: true }];
    const unsuccessful: any[] = [{ name: 'SpecComponent', success: false }];

    expect(add1).toMatchObject(successful);
    expect(add2).toMatchObject(unsuccessful);
  });

  it('should only remove a component once', () => {
    const updater: Updater = new Updater();
    const component: Component = new Component();

    updater.add(component);

    const remove1: boolean = updater.remove(component);
    const remove2: boolean = updater.remove(component);

    expect(remove1).toBe(true);
    expect(remove2).toBe(false);
  });
});
