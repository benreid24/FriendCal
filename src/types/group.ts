import type {Person} from "./person";

export interface Group {
  id: string;
  name: string;
  members: Person[];
}
