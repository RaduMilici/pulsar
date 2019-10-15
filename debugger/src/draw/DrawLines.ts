import { point, Line } from '../../../src';
import Draw from './Draw';
import { c_line, s_line } from './const';

export default class DrawTriangles extends Draw {
  line({ a, b }: Line, color: string = c_line, size: number = s_line): void {
    const carthA: point = this.toCarthesian(a);
    const carthB: point = this.toCarthesian(b);
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = size;
    this.context.moveTo(carthA.x, carthA.y);
    this.context.lineTo(carthB.x, carthB.y);
    this.context.stroke();
  }

  lines(lines: Line[], color?: string, size?: number): void {
    lines.forEach((line: Line) => this.line(line, color, size));
  }
}
