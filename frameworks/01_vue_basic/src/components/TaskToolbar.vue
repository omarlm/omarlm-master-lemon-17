<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { Search } from 'lucide-vue-next';

const props = defineProps<{
  filter: 'all' | 'done' | 'pending';
  sortBy: 'content-asc' | 'content-desc' | 'done-first' | 'pending-first';
  search: string;
  allChecked: boolean;
  hasCompletedTasks: boolean;
  hasAnyTasks: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:filter', value: typeof props.filter): void;
  (e: 'update:sortBy', value: typeof props.sortBy): void;
  (e: 'update:search', value: string): void;
  (e: 'update:allChecked', value: boolean): void;
  (e: 'clearCompleted'): void;
}>();

const updateChecked = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:allChecked', target.checked);
};
</script>

<template>
  <div class="px-4 my-4">
    <!-- 🔍 Search with icon -->
    <div class="flex items-center border-b-2 border-teal-500 py-2">
      <Search class="w-5 h-5 text-gray-400 mr-2" />
      <input
        :value="props.search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search tasks..."
        class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
      />
    </div>
  </div>

  <div class="flex justify-center flex-wrap gap-4 my-4 px-4 items-center">
    <select
      :value="props.filter"
      @change="emit('update:filter', ($event.target as HTMLSelectElement).value as any)"
      class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="done">Completed</option>
    </select>

    <select
      :value="props.sortBy"
      @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as any)"
      class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <option value="content-asc">A → Z</option>
      <option value="content-desc">Z → A</option>
      <option value="done-first">Done first</option>
      <option value="pending-first">Pending first</option>
    </select>

    <label class="inline-flex items-center gap-2">
      <input
        type="checkbox"
        :checked="props.allChecked"
        :disabled="!props.hasAnyTasks"
        @change="updateChecked"
        class="h-5 w-5 text-teal-600 border-gray-300 rounded disabled:opacity-50"
      />
      <span class="text-sm">Mark all as {{ props.allChecked ? 'done' : 'pending' }}</span>
    </label>

    <button
      @click="emit('clearCompleted')"
      :disabled="!props.hasCompletedTasks"
      class="px-3 py-2 rounded text-white"
      :class="props.hasCompletedTasks ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'"
    >
      Clear completed
    </button>
  </div>
</template>