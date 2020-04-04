import id from '../../interfaces/id';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';

export default interface I_Navigator extends id {
  readonly id: string;

  path: I_NavigatorTile[];

  start(): boolean;
}
