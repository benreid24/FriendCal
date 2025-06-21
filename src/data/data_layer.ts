import type { Person } from '../types/person';
import type { Group } from '../types/group';
import type { Target } from '../types/target';
import type { Hangout } from '../types/hangout';

export type DataEventChannel = 'people' | 'groups' | 'targets' | 'hangouts';
export type DataEventListener = (channel: DataEventChannel) => void;

export abstract class DataLayer {
  abstract getPeople(): Promise<Person[]>;
  abstract getPerson(id: string): Promise<Person | undefined>;
  abstract createPerson(person: Omit<Person, 'id'>): Promise<void>;
  abstract updatePerson(person: Person): Promise<void>;
  abstract removePerson(id: string): Promise<void>;

  abstract getGroups(): Promise<Group[]>;
  abstract getGroup(id: string): Promise<Group | undefined>;
  abstract createGroup(group: Omit<Group, 'id'>): Promise<void>;
  abstract updateGroup(group: Group): Promise<void>;
  abstract removeGroup(id: string): Promise<void>;

  abstract getTargets(): Promise<Target[]>;
  abstract getTarget(id: string): Promise<Target | undefined>;
  abstract createTarget(target: Omit<Target, 'id'>): Promise<void>;
  abstract updateTarget(target: Target): Promise<void>;
  abstract removeTarget(id: string): Promise<void>;

  abstract getHangouts(): Promise<Hangout[]>;
  abstract getHangout(id: string): Promise<Hangout | undefined>;
  abstract createHangout(hangout: Omit<Hangout, 'id'>): Promise<void>;
  abstract updateHangout(hangout: Hangout): Promise<void>;
  abstract removeHangout(id: string): Promise<void>;

  private eventListeners: Record<DataEventChannel, DataEventListener[]>;

  constructor() {
    this.eventListeners = {
      people: [],
      groups: [],
      targets: [],
      hangouts: [],
    };
  }

  addEventListener(channel: DataEventChannel, listener: DataEventListener) {
    this.eventListeners[channel].push(listener);
  }

  removeEventListener(channel: DataEventChannel, listener: DataEventListener) {
    this.eventListeners[channel] = this.eventListeners[channel].filter(l => l !== listener);
  }

  protected dispatchEvent(channel: DataEventChannel) {
    this.eventListeners[channel].forEach(l => l(channel));
  }
}
