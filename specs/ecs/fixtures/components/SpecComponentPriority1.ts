import { Component } from '../../../../src/ecs';

export default class Priority1Component extends Component {
  constructor() {
    super({ name: 'Priority1Component', updatePriority: 1 });
  }
}
