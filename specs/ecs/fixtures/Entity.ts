import { Entity } from '../../../src/ecs';
import SpecComponent from './Component';

export default class SpecEntity extends Entity {
  constructor() {
    super();
    this.name = 'SpecEntity';
    this.components.push(new SpecComponent());
  }
}
