import tickData from '../tickData';

export default interface Update {
  update(tickData: tickData): void;
}
