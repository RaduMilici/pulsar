const code = `const updater = new Pulsar.Updater();

class Circle extends Pulsar.GameObject {
  position = new Pulsar.Vector({ x: 0, y: 0 });
}

class Move extends Pulsar.Component {
    parent: Circle;
    update({ elapsedTime }: Pulsar.tickData): void {
      const x: number = Math.sin(elapsedTime) * 100;
      this.parent.position = new Pulsar.Vector({ x, y: 0 });
    }
}

class Draw extends Pulsar.Component {
  parent: Circle;
  update(): void {
    draw.clear();
    draw.point(this.parent.position, 'blue', 'white', 100);
  }
}

const circle = new Circle({ name: 'circle' });
const moveC = new Move({ name: 'move' });
const drawC = new Draw({ name: 'draw' });
circle.addComponent(moveC);
circle.addComponent(drawC);
updater.add(circle);
updater.start();
`;

export default { code, name: 'updater' };
