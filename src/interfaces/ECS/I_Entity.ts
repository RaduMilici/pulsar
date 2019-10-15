export default interface I_Entity {
  id: string;
  name: string;

  start?(): void;
  stop?(): void;
}
