import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import { db, type Task } from "../db/db";

interface TaskState {
  tasks: Task[];
}

export const useTaskStore = defineStore("taskStore", {
  state: (): TaskState => ({ tasks: [] }),

  actions: {
    async loadTasks() {
      this.tasks = await db.tasks.toArray();
    },

    async addTask(title: string) {
      const task: Task = { id: nanoid(8), title, done: false };
      await db.tasks.add(task);
      this.tasks.push(task);
    },

    async removeTask(id: string) {
      await db.tasks.delete(id);
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    },

    async toggleTask(id: string) {
      const task = this.tasks.find((task: Task) => task.id === id);
      if (task) {
        task.done = !task.done;
        await db.tasks.update(id, { done: task.done });
      }
    },

    clearCompletedTasks() {
      const completed = this.tasks.filter(task => task.done);
      const completedIds = completed.map(task => task.id);

      this.tasks = this.tasks.filter(task => !task.done);

      db.tasks.bulkDelete(completedIds);
    },

    async editTask(id: string, newTitle: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.title = newTitle;
        await db.tasks.update(id, { title: newTitle });
      }
    }

  },
});
