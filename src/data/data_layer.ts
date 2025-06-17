import type { Person } from '../types/person';
import type { Group } from '../types/group';
import type { Target } from '../types/target';
import type { Hangout } from '../types/hangout';

export interface DataLayer {
  getPeople: () => Person[];
  getPerson: (id: string) => Person | undefined;
  createPerson: (person: Person) => void;
  removePerson: (id: string) => void;

  getGroups: () => Group[];
  getGroup: (id: string) => Group | undefined;
  createGroup: (group: Group) => void;
  removeGroup: (id: string) => void;

  getTargets: () => Target[];
  getTarget: (id: string) => Target | undefined;
  createTarget: (target: Target) => void;
  removeTarget: (id: string) => void;

  getHangouts: () => Hangout[];
  getHangout: (id: string) => Hangout | undefined;
  createHangout: (hangout: Hangout) => void;
  removeHangout: (id: string) => void;
}
