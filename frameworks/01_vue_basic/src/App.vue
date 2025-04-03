<script setup lang="ts">
import { onMounted } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import { useTaskStore } from "./stores/taskStore";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.loadTasks();
});
</script>

<template>
  <div
    class="max-w-md mx-4 md:mx-auto lg:mx-auto shadow-lg rounded-lg overflow-hidden mt-16"
  >
    <div class="px-4 py-2">
      <h1 class="text-gray-800 font-bold text-2xl uppercase text-center">
        To-Do List
      </h1>
    </div>
    <TaskForm />
    <TaskList />
  </div>
</template>

<style scoped></style>
