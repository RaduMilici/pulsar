import { row, id } from '../../interfaces';

export default interface I_Navigator extends id {
  readonly id: string;

  path: row;

  start(): boolean;
}
