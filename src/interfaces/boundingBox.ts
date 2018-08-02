import Vector from '../common/Vector';

export default interface boundingBox {
  topLeft: Vector;
  topRight: Vector;
  bottomRight: Vector;
  bottomLeft: Vector;
}
