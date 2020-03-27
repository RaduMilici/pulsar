import { Component, Updater } from '../../src/ecs';
import { tickData } from '../../src/interfaces';

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

  it('should have its lifecycle hooks called by Updater', () => {
    const updater: Updater = new Updater();
    const component: MyComponent = new MyComponent({ name: 'MyComponent' });

    updater.add(component);
    updater.start();
    updater.stop();

    expect(startMock.mock.calls.length).toBe(1);
    expect(stopMock.mock.calls.length).toBe(1);
    expect(updateMock.mock.calls.length).toBe(1);
  });

  it('should call update with a tickData argument', () => {
    const updater: Updater = new Updater();
    const component: MyComponent = new MyComponent({ name: 'MyComponent' });

    updater.add(component);
    updater.start();
    updater.stop();

    expect(updateMock.mock.calls[0][0]).toHaveProperty('deltaTime');
    expect(updateMock.mock.calls[0][0]).toHaveProperty('elapsedTime');
  });
});
