import GameObject from './GameObject';
import { I_Component } from '../Component';
import { tickData } from '../../types';

class TestComponent implements I_Component {
  parent: GameObject = null;
  updatePriority = 0;
  id = 'test_component';
  name = 'TestComponent';

  start(): void {
    // Implementation not needed for testing purposes.
  }

  stop(): void {
    // Implementation not needed for testing purposes.
  }

  update(tickData: tickData): void {
    // Implementation not needed for testing purposes.
  }

  destroy(): void {
    // Implementation not needed for testing purposes.
  }
}

class TestGameObject extends GameObject {}

describe('GameObject', () => {
  let gameObject: TestGameObject;
  let component: TestComponent;

  beforeEach(() => {
    gameObject = new TestGameObject({ name: 'TestGameObject' });
    component = new TestComponent();
  });

  test('should initialize with empty components array', () => {
    expect(gameObject.components).toEqual([]);
  });

  describe('addComponent', () => {
    test('should add component and return true if not already added', () => {
      const result = gameObject.addComponent(component);
      expect(result).toBeTruthy();
      expect(gameObject.components).toContain(component);
      expect(component.parent).toBe(gameObject);
    });

    test('should not add component and return false if already added', () => {
      gameObject.addComponent(component);
      const result = gameObject.addComponent(component);
      expect(result).toBeFalsy();
      expect(gameObject.components.filter(c => c === component).length).toBe(1);
    });
  });

  describe('removeComponent', () => {
    test('should remove component and return true if component is in array', () => {
      gameObject.addComponent(component);
      const result = gameObject.removeComponent(component);
      expect(result).toBeTruthy();
      expect(gameObject.components).not.toContain(component);
      expect(component.parent).toBeNull();
    });

    test('should not remove component and return false if component is not in array', () => {
      const result = gameObject.removeComponent(component);
      expect(result).toBeFalsy();
      expect(gameObject.components).not.toContain(component);
    });
  });
});
