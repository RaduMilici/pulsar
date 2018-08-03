import BoundingBox from '../common/BoundingBox';
import Vector from '../common/Vector';
import Shape from '../common/Shape';

export default class QuadTree {
  private parent: QuadTree;
  private children: QuadTree[] = [];
  private capacity: number = 1;
  private containedPoints: Vector[] = [];
  private side: number;

  constructor(private boundingBox: BoundingBox) {}
}
