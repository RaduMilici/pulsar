import I_Vector from '../Vector/I_Vector';
import I_Line from '../Line/I_Line';
import { id, triangleLines } from '../../interfaces';

export default interface Triangle extends id {
    readonly lines: triangleLines;
    centroid: I_Vector;
    points: I_Vector[];
    linesArray: I_Line[];

    equals(triangle: Triangle): boolean;
    isPointInCircumcircle(point: I_Vector): boolean;
    hasPoint(point: I_Vector): boolean;
    hasAnyPoint(points: I_Vector[]): boolean;
}
