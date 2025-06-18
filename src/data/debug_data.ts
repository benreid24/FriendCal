import { getRecentDate } from '../lib/time';
import type { Group } from '../types/group';
import type { Hangout } from '../types/hangout';
import type { Person } from '../types/person';
import type { Target } from '../types/target';
import { DataLayer } from './data_layer';

export class DebugData extends DataLayer {
  private people: Person[];
  private groups: Group[];
  private targets: Target[];
  private hangouts: Hangout[];

  constructor() {
    super();
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
        members: [this.people[0], this.people[1]],
      },
      {
        id: 'g2',
        name: 'John & Quesadilla',
        members: [this.people[2], this.people[3]],
      },
    ];

    this.targets = [
      {
        id: 't1',
        type: 'group',
        target: this.groups[0],
      },
      {
        id: 't2',
        type: 'group',
        target: this.groups[1],
      },
      {
        id: 't3',
        type: 'person',
        target: this.people[0],
      },
    ];

    this.hangouts = [
      {
        id: 'h1',
        target: this.targets[0],
        time: getRecentDate(new Date(), 15),
      },
      {
        id: 'h2',
        target: this.targets[1],
        time: getRecentDate(new Date(), -15),
      },
      {
        id: 'h3',
        target: this.targets[1],
        time: getRecentDate(new Date(), -25),
      },
      {
        id: 'h4',
        target: this.targets[2],
        time: getRecentDate(new Date(), 12),
      },
      {
        id: 'h5',
        target: this.targets[2],
        time: getRecentDate(new Date(), -15),
      },
      {
        id: 'h6',
        target: this.targets[2],
        time: getRecentDate(new Date(), -25),
      },
      {
        id: 'h7',
        target: this.targets[2],
        time: getRecentDate(new Date(), 21),
      },
    ];
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
