import tickData from '../tickData';

export default interface Updatable {
  update(tickData: tickData): void;
}
