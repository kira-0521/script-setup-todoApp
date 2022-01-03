<script lang="ts" setup>
import { inject } from 'vue'
import { todoKey } from '@/store/todo'
import TodoItem from '../components/TodoItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const todoStore = inject(todoKey)
if (!todoStore) {
  throw new Error('todoStore is not provided')
}

await todoStore.fetchTodos()
</script>

<template>
  <ul>
    <todo-item
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-delete="todoStore.deleteTodo"
      @click-title="router.push(`/edit/${todo.id}`)"
    />
  </ul>
</template>
