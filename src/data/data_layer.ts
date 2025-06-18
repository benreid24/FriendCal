import type { Person } from '../types/person';
import type { Group } from '../types/group';
import type { Target } from '../types/target';
import type { Hangout } from '../types/hangout';

export interface DataLayerInterface {
  getPeople(): Person[];
  getPerson(id: string): Person | undefined;
  createPerson(person: Person): void;
  removePerson(id: string): void;

  getGroups(): Group[];
  getGroup(id: string): Group | undefined;
  createGroup(group: Group): void;
  removeGroup(id: string): void;

  getTargets(): Target[];
  getTarget(id: string): Target | undefined;
  createTarget(target: Target): void;
  removeTarget(id: string): void;

  getHangouts(): Hangout[];
  getHangoutsForTarget(id: string): Hangout[];
  getPriorHangoutsForTarget(id: string): Hangout[];
  getHangout(id: string): Hangout | undefined;
  getNextHangout(id: string): Hangout | undefined;
  getLastHangout(id: string): Hangout | undefined;
  createHangout(hangout: Hangout): void;
  removeHangout(id: string): void;
}

export abstract class DataLayer implements DataLayerInterface {
  abstract getPeople(): Person[];
  abstract getPerson(id: string): Person | undefined;
  abstract createPerson(person: Person): void;
  abstract removePerson(id: string): void;

  abstract getGroups(): Group[];
  abstract getGroup(id: string): Group | undefined;
  abstract createGroup(group: Group): void;
  abstract removeGroup(id: string): void;

  abstract getTargets(): Target[];
  abstract getTarget(id: string): Target | undefined;
  abstract createTarget(target: Target): void;
  abstract removeTarget(id: string): void;

  abstract getHangouts(): Hangout[];

  getHangoutsForTarget(id: string) {
    return this.getHangouts().filter(h => h.target.id === id);
  }

  abstract getHangout(id: string): Hangout | undefined;

  getNextHangout(id: string) {
    const hangs = this.getHangoutsForTarget(id);
    const now = Date.now();
    return hangs.reduce((val: Hangout | undefined, h: Hangout) => {
      if (h.time.getTime() > now) {
        if (!val || val.time.getTime() > h.time.getTime()) {
          return h;
        }
      }
      return val;
    }, undefined);
  }

  getLastHangout(id: string) {
    const hangs = this.getHangoutsForTarget(id);
    const now = Date.now();
    return hangs.reduce((val: Hangout | undefined, h: Hangout) => {
      if (h.time.getTime() < now) {
        if (!val || val.time.getTime() < h.time.getTime()) {
          return h;
        }
      }
      return val;
    }, undefined);
  }

  getPriorHangoutsForTarget(id: string): Hangout[] {
    const now = Date.now();
    return this.getHangoutsForTarget(id).filter(h => h.time.getTime() < now);
  }

  abstract createHangout(hangout: Hangout): void;
  abstract removeHangout(id: string): void;
}
