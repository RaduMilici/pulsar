import { Component, Updater, GameObject } from '../../src/ecs';
import { tickData } from '../../src/interfaces';
import SpecGameObject from './fixtures/SpecGameObject';

let startMock: any;
let stopMock: any;
let updateMock: any;

class MyComponent extends Component {
  start() {
    startMock();
  }

  stop() {
    stopMock();
  }

  update(tickData: tickData) {
    updateMock(tickData);
  }
}

describe('ecs / Component', () => {
  beforeEach(() => {
    startMock = jest.fn();
    stopMock = jest.fn();
    updateMock = jest.fn();
  });

  it.only('should have its lifecycle hooks called by Updater', () => {
    const updater: Updater = new Updater();
    const component: MyComponent = new MyComponent({ name: 'MyComponent' });
    const gameObject: GameObject = new SpecGameObject();

    gameObject.addComponent(component);
    updater.add(gameObject);
    updater.start();
    updater.stop();

    expect(startMock).toBeCalledTimes(1);
    // expect(stopMock.mock.calls.length).toBe(1);
    // expect(updateMock.mock.calls.length).toBe(1);
  });

  it('should call update with a tickData argument', () => {
    const updater: Updater = new Updater();
    const component: MyComponent = new MyComponent({ name: 'MyComponent' });
    const gameObject: GameObject = new SpecGameObject();

    gameObject.addComponent(component);

    updater.add(gameObject);
    updater.start();
    updater.stop();

    expect(updateMock.mock.calls[0][0]).toHaveProperty('deltaTime');
    expect(updateMock.mock.calls[0][0]).toHaveProperty('elapsedTime');
  });
});
