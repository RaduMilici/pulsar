import { Line, Vector } from '../common'

type boundingBoxLines = {
  top: Line;
  right: Line;
  bottom: Line;
  left: Line;
};

type limits = {
  top: Vector;
  bottom: Vector;
  left: Vector;
  right: Vector;
};

export { boundingBoxLines, limits };
