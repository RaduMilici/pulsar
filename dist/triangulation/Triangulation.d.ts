import Vector from '../common/Vector';
import Line from '../common/Line';
import Triangle from '../common/Triangle';
import Hull from './Hull';
import MinimumSpanningTree from './MinimumSpanningTree';
export default class Triangulation {
  readonly points: Vector[];
  readonly lines: Line[];
  readonly triangles: Triangle[];
  readonly MST: MinimumSpanningTree;
  readonly hull: Hull;
  private holderTriangle;
  constructor(points: Vector[]);
  start(): void;
  private static MakeHolderTriangle;
  private cleanHolderTriangle;
  private addFinishedTriangulationLines;
}
//# sourceMappingURL=Triangulation.d.ts.map
