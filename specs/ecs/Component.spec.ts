import { Component, Updater, GameObject } from '../../src/ecs';
import { tickData } from '../../src/interfaces';
import SpecGameObject from './fixtures/SpecGameObject';

const startMock: any = jest.fn();
const stopMock: any = jest.fn();
const updateMock: any = jest.fn();

class MyComponent extends Component {
  constructor() {
    super({ name: 'MyComponent' });
  }

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
    startMock.mockReset();
    stopMock.mockReset();
    updateMock.mockReset();
  });

  it.only('should have its lifecycle hooks called by Updater', () => {
    const updater: Updater = new Updater();
    const component: MyComponent = new MyComponent();
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
    const component: MyComponent = new MyComponent();
    const gameObject: GameObject = new SpecGameObject();

    gameObject.addComponent(component);

    updater.add(gameObject);
    updater.start();
    updater.stop();

    expect(updateMock.mock.calls[0][0]).toHaveProperty('deltaTime');
    expect(updateMock.mock.calls[0][0]).toHaveProperty('elapsedTime');
  });
});
