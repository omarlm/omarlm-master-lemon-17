<script setup lang="ts">
import { ref } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import { useTaskStore } from '../stores/taskStore';
import type { Task } from '../db/db';

const props = defineProps<{ task: Task }>();

const taskStore = useTaskStore();

const editingId = ref<string | null>(null);
const editedTitle = ref('');

const toggleTask = () => {
  taskStore.toggleTask(props.task.id);
};

const removeTask = () => {
  taskStore.removeTask(props.task.id);
};

const startEditing = () => {
  editingId.value = props.task.id;
  editedTitle.value = props.task.title;
};

const saveEdit = async () => {
  if (editedTitle.value.trim()) {
    await taskStore.editTask(props.task.id, editedTitle.value.trim());
  }
  editingId.value = null;
};
</script>

<template>
  <li class="py-4 flex items-center">
    <input
      type="checkbox"
      class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
      :checked="task.done"
      @change="toggleTask"
    />
    <div class="ml-3 flex-1">
      <input
        v-if="editingId === task.id"
        v-model="editedTitle"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        class="w-full border-b border-teal-500 bg-transparent text-lg"
        type="text"
        autofocus
      />
      <span
        v-else
        :class="[
          'text-lg font-medium cursor-text',
          { 'line-through text-gray-500': task.done },
        ]"
        @dblclick="startEditing"
      >
        {{ task.title }}
      </span>
    </div>
    <button
      @click="removeTask"
      class="ml-4 p-2 text-red-500 hover:text-red-700 rounded"
      aria-label="Remove task"
    >
      <Trash2 class="w-5 h-5" />
      <span class="sr-only">Remove task</span>
    </button>
  </li>
</template>
