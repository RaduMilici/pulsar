import { row, id } from '../../interfaces';

export default interface Navigator extends id {
  readonly id: string;

  path: row;
  start(): boolean;
}
