<template>
  <div class="counter">
    <h2>Contador workflow</h2>
    <p class="count">{{ count }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="decrement" class="ml-2">Decrementar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>

<style scoped>
.counter {
  text-align: center;
  margin: 2rem 0;
}
.count {
  font-size: 2rem;
  margin: 1rem 0;
}
.ml-2 {
  margin-left: 0.5rem;
}
</style>
