import { Updater } from '../Updater';
import { I_Component } from '../Component';
import { GameObject } from '../GameObject';
import SpecComponent from '../../../specs/ecs/fixtures/SpecComponent';
import SpecComponentPriority1 from '../../../specs/ecs/fixtures/SpecComponentPriority1';
import SpecGameObject from '../../../specs/ecs/fixtures/SpecGameObject';

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

  it('should only add a GameObject once', () => {
    const updater: Updater = new Updater();
    const gameObject: GameObject = new SpecGameObject();

    const add1: boolean = updater.add(gameObject);
    const add2: boolean = updater.add(gameObject);

    expect(add1).toBe(true);
    expect(add2).toBe(false);
  });

  it('should only remove a GameObject once', () => {
    const updater: Updater = new Updater();
    const gameObject: GameObject = new SpecGameObject();

    updater.add(gameObject);

    const remove1: boolean = updater.remove(gameObject);
    const remove2: boolean = updater.remove(gameObject);

    expect(remove1).toBe(true);
    expect(remove2).toBe(false);
  });

  it('should update components using a priority number', () => {
    const updater: Updater = new Updater();
    const gameObject: GameObject = new SpecGameObject();
    const component0: I_Component = new SpecComponent();
    const component1: I_Component = new SpecComponentPriority1();

    let time0: number = null;
    let time1: number = null;

    component0.update = () => {
      time0 = performance.now();
    };

    component1.update = () => {
      time1 = performance.now();
    };

    gameObject.addComponent(component0);
    gameObject.addComponent(component1);

    updater.add(gameObject);
    updater.start();
    updater.stop();

    expect(time0).toBeLessThan(time1);
  });
});
