import Dexie, { type Table } from "dexie";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export class TodoDB extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super("todoDatabase");
    this.version(1).stores({
      tasks: "id, title, done",
    });
  }
}

export const db = new TodoDB();
