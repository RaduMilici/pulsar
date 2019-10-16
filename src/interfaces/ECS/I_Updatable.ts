import { tickData } from '../../types'

export default interface I_Updatable {
  update(tickData: tickData): void;
}