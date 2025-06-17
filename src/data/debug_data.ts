import type { Group } from '../types/group';
import type { Hangout } from '../types/hangout';
import type { Person } from '../types/person';
import type { Target } from '../types/target';
import type { DataLayer } from './data_layer';

export class DebugData implements DataLayer {
  private people: Person[];
  private groups: Group[];
  private targets: Target[];
  private hangouts: Hangout[];

  constructor() {
    this.people = [
      {
        id: 'p1',
        name: 'Jim',
      },
      {
        id: 'p2',
        name: 'Sarah',
      },
      {
        id: 'p3',
        name: 'John',
      },
      {
        id: 'p4',
        name: 'Quesadilla',
      },
    ];

    this.groups = [
      {
        id: 'g1',
        name: 'Jim & Sarah',
        members: ['p1', 'p2'],
      },
      {
        id: 'g2',
        name: 'John & Quesadilla',
        members: ['p3', 'p4'],
      },
    ];

    this.targets = [
      {
        id: 't1',
        type: 'group',
        target: 'g1',
        name: 'Jim & Sarah',
      },
      {
        id: 't2',
        type: 'group',
        target: 'g2',
        name: 'John & Quesadilla',
      },
      {
        id: 't3',
        type: 'person',
        target: 'p1',
        name: 'Jim',
      },
    ];

    this.hangouts = [];
  }

  getPeople() {
    return this.people;
  }

  getPerson(id: string) {
    return this.people.find(p => p.id === id);
  }

  createPerson(person: Person) {
    this.people.push(person);
  }

  removePerson(id: string) {
    this.people = this.people.filter(p => p.id !== id);
  }

  getGroups() {
    return this.groups;
  }

  getGroup(id: string) {
    return this.groups.find(g => g.id === id);
  }

  createGroup(group: Group) {
    this.groups.push(group);
  }

  removeGroup(id: string) {
    this.groups = this.groups.filter(g => g.id !== id);
  }

  getTargets() {
    return this.targets;
  }

  getTarget(id: string) {
    return this.targets.find(t => t.id === id);
  }

  createTarget(target: Target) {
    this.targets.push(target);
  }

  removeTarget(id: string) {
    this.targets = this.targets.filter(t => t.id !== id);
  }

  getHangouts() {
    return this.hangouts;
  }

  getHangout(id: string) {
    return this.hangouts.find(h => h.id === id);
  }

  createHangout(hangout: Hangout) {
    this.hangouts.push(hangout);
  }

  removeHangout(id: string) {
    this.hangouts = this.hangouts.filter(h => h.id !== id);
  }
}
