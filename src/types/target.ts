import type {Group} from "./group";
import type {Person} from "./person";

export const TargetTypes = {
  Person: 'person',
  Group: 'group',
} as const;

export type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

export interface Target {
  id: string;
  type: TargetType;
  target: Person | Group;
}
