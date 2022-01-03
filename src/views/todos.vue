<script setup lang="ts">
import { inject } from 'vue'
import { todoKey } from '@/store/todo'
import TodoItem from '../components/TodoItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const todoStore = inject(todoKey)
if (!todoStore) {
  throw new Error('todoStore is not provided')
}

</script>

<template>
  <h2>Todo一覧です。</h2>
  <ul>
    <todo-item
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-delete="todoStore.deleteTodo"
      @click-title="router.push(`/edit/${todo.id}`)"
    />
  </ul>
  <router-link to="/new">新規作成</router-link>
</template>
