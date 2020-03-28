export default interface I_Entity {
  readonly id: string;
  readonly name: string;

  start(): void;
  stop(): void;
}
