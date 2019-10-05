export default interface I_ECS_Object {
  readonly id: string;
  readonly name: string;
  start(): void;
  stop(): void;
}