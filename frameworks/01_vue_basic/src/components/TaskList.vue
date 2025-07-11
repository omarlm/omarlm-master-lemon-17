<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';
import TaskToolbar from './TaskToolbar.vue';
import TaskItem from './TaskItem.vue';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const filter = ref<'all' | 'done' | 'pending'>('all');
const sortBy = ref<'content-asc' | 'content-desc' | 'done-first' | 'pending-first'>('content-asc');
const search = ref('');
const allChecked = ref(false);

const hasCompletedTasks = computed(() => tasks.value.some(task => task.done));
const hasAnyTasks = computed(() => tasks.value.length > 0);

watch(
  () => tasks.value.map(t => t.done),
  () => {
    allChecked.value = tasks.value.length > 0 && tasks.value.every(task => task.done);
  },
  { deep: true, immediate: true }
);

watch(allChecked, (value) => {
  if (!hasAnyTasks.value) return;
  tasks.value.forEach(task => {
    if (task.done !== value) {
      taskStore.toggleTask(task.id);
    }
  });
});

const clearCompleted = () => {
  taskStore.clearCompletedTasks();
};

const filteredTasks = computed(() => {
  let result = tasks.value;
  if (filter.value === 'done') {
    result = result.filter(t => t.done);
  } else if (filter.value === 'pending') {
    result = result.filter(t => !t.done);
  }
  if (search.value.trim()) {
    const query = search.value.toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(query));
  }
  switch (sortBy.value) {
    case 'content-asc':
      result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'content-desc':
      result = result.slice().sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'done-first':
      result = result.slice().sort((a, b) => Number(b.done) - Number(a.done));
      break;
    case 'pending-first':
      result = result.slice().sort((a, b) => Number(a.done) - Number(b.done));
      break;
  }
  return result;
});
</script>

<template>
  <TaskToolbar
    :filter="filter"
    :sortBy="sortBy"
    :search="search"
    :allChecked="allChecked"
    :hasCompletedTasks="hasCompletedTasks"
    :hasAnyTasks="hasAnyTasks"
    @update:filter="(val) => filter = val"
    @update:sortBy="(val) => sortBy = val"
    @update:search="(val) => search = val"
    @update:allChecked="(val) => allChecked = val"
    @clearCompleted="clearCompleted"
  />

  <ul class="divide-y divide-gray-200 px-4">
    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
    />
  </ul>
</template>
