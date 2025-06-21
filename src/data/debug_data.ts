import { getRecentDate } from '../lib/time';
import type { Group } from '../types/group';
import type { Hangout } from '../types/hangout';
import type { Person } from '../types/person';
import type { Target } from '../types/target';
import { DataLayer } from './data_layer';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // ensures variant 1
    return v.toString(16);
  });
}

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

  async getPeople() {
    return this.people;
  }

  async getPerson(id: string) {
    return this.people.find(p => p.id === id);
  }

  async createPerson(person: Omit<Person, 'id'>) {
    this.people.push({ id: generateUUID(), ...person });
    this.dispatchEvent('people');
  }

  async updatePerson(person: Person): Promise<void> {
    this.people = this.people.map(p => (p.id === person.id ? person : p));
    this.dispatchEvent('people');
  }

  async removePerson(id: string) {
    this.people = this.people.filter(p => p.id !== id);
    this.dispatchEvent('people');
  }

  async getGroups() {
    return this.groups;
  }

  async getGroup(id: string) {
    return this.groups.find(g => g.id === id);
  }

  async createGroup(group: Omit<Group, 'id'>) {
    this.groups.push({ id: generateUUID(), ...group });
    this.dispatchEvent('groups');
  }

  async updateGroup(group: Group): Promise<void> {
    this.groups = this.groups.map(g => (g.id === group.id ? group : g));
    this.dispatchEvent('groups');
  }

  async removeGroup(id: string) {
    this.groups = this.groups.filter(g => g.id !== id);
    this.dispatchEvent('groups');
  }

  async getTargets() {
    return this.targets;
  }

  async getTarget(id: string) {
    return this.targets.find(t => t.id === id);
  }

  async createTarget(target: Omit<Target, 'id'>) {
    this.targets.push({ id: generateUUID(), ...target });
    this.dispatchEvent('targets');
  }

  async updateTarget(target: Target): Promise<void> {
    this.targets = this.targets.map(t => (t.id === target.id ? target : t));
    this.dispatchEvent('targets');
  }

  async removeTarget(id: string) {
    this.targets = this.targets.filter(t => t.id !== id);
    this.dispatchEvent('targets');
  }

  async getHangouts() {
    return this.hangouts;
  }

  async getHangout(id: string) {
    return this.hangouts.find(h => h.id === id);
  }

  async createHangout(hangout: Omit<Hangout, 'id'>) {
    this.hangouts.push({ id: generateUUID(), ...hangout });
    this.dispatchEvent('hangouts');
  }

  async updateHangout(hangout: Hangout): Promise<void> {
    this.hangouts = this.hangouts.map(h => (h.id === hangout.id ? hangout : h));
    this.dispatchEvent('hangouts');
  }

  async removeHangout(id: string) {
    this.hangouts = this.hangouts.filter(h => h.id !== id);
    this.dispatchEvent('hangouts');
  }
}
