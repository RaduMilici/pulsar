import { Component } from '../../../src/ecs';

export default class SpecComponent extends Component {
  constructor() {
    super();
    this.name = 'SpecComponent';
    this.updatePriority = 0;
  }
}

class Priority1Component extends Component {
  constructor() {
    super();
    this.name = 'Priority1Component';
    this.updatePriority = 1;
  }
}

export { Priority1Component };
