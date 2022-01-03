<script setup lang="ts">
import AsyncTodosVue from '@/components/AsyncTodos.vue'
import { onErrorCaptured, ref } from 'vue'

const error = ref<unknown>(null)

onErrorCaptured((err) => {
  error.value = err
  return true
})
</script>

<template>
  <h2>Todo一覧です。</h2>
  <div v-if="error">
    {{ error.message }}
  </div>
  <suspense>
    <template #default>
      <AsyncTodosVue />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
  <router-link to="/new">新規作成</router-link>
</template>
