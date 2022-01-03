<script setup lang="ts">
import AsyncTodosVue from '@/components/AsyncTodos.vue'
</script>

<template>
  <h2>Todo一覧です。</h2>
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
