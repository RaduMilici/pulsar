import { Line } from '../common';
import { I_Triangulation } from './Triangulation';

export default class MinimumSpanningTree {
  readonly lines: Line[] = [];
  private _nonMinSpanLines: Line[] = [];
  private uniqueLines: Line[] = [];
  private readonly triangulationLines: Line[] = [];

  constructor({ lines }: I_Triangulation) {
    this.triangulationLines = lines;
  }

  get nonMinSpanLines(): Line[] {
    return this._nonMinSpanLines;
  }

  start(): void {
    this.getLines();

    this.uniqueLines.forEach((line: Line) => line.makeDisjoinedSets());

    this.uniqueLines.forEach((line: Line, i: number) => {
      if (!line.a.set.equals(line.b.set)) {
        line.b.set = line.a.set.merge(line.b.set);
        this.lines.push(line);
        this._nonMinSpanLines[i] = null;
      }
    });

    this._nonMinSpanLines = this._nonMinSpanLines.filter((line: Line) => line);
  }

  private getLines(): void {
    let lines: Line[] = Line.RemoveDuplicates(this.triangulationLines);
    this.uniqueLines = [...lines];
    this._nonMinSpanLines = [...lines];
  }
}
