import I_Vector from '../common/Vector/I_Vector';
import I_Line from '../common/Line/I_Line';

type boundingBoxLines = {
  top: I_Line;
  right: I_Line;
  bottom: I_Line;
  left: I_Line;
};

type limits = {
  top: I_Vector;
  bottom: I_Vector;
  left: I_Vector;
  right: I_Vector;
};

export { boundingBoxLines, limits };
