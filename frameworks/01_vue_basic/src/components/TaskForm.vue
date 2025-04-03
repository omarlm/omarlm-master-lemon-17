<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const newTask = ref("");

const addTask = () => {
  if (newTask.value.trim()) {
    taskStore.addTask(newTask.value);
    newTask.value = "";
  }
};
</script>

<template>
  <form class="w-full max-w-sm mx-auto px-4 py-2" @submit.prevent="addTask">
    <div class="flex items-center border-b-2 border-teal-500 py-2">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        v-model="newTask"
        placeholder="Add a new task..."
      />

      <button
        type="submit"
        aria-label="Add task"
        class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white p-2 rounded cursor-pointer"
      >
        <Plus class="w-5 h-5" />
        <span class="sr-only">Add task</span>
      </button>
    </div>
  </form>
</template>
