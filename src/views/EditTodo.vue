<script lang="ts" setup>
import { todoKey } from '@/store/todo'
import { Params, Todo } from '@/store/todo/types'
import { inject, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const todoStore = inject(todoKey)
if (!todoStore) {
  throw new Error('todoStore is not provided')
}

const router = useRouter()
const route = useRoute()

// フォームに値が反映されていない
const todo = reactive<Todo>({} as Todo)
const error = ref(false)
try {
  const editingTodo = todoStore.getTodo(Number(route.params.id))
  Object.assign(todo, editingTodo)
  error.value = false
} catch (err) {
  error.value = true
}
const formData = reactive<Params>({
  title: todo.title,
  description: todo.description,
  status: todo.status
})

const onSubmit = () => {
  todoStore.updateTodo(Number(route.params.id), {
    ...todo,
    title: formData.title,
    description: formData.description,
    status: formData.status
  })
  router.push('/')
}
</script>

<template>
  <h2>TODOを編集する</h2>
  <div v-if="error">
    // ① ID：{{ $route.params.id }}のTODOが見つかりませんでした。
  </div>
  <form v-else @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input type="text" id="title" v-model="formData.title" />
    </div>
    <div>
      <label for="description">説明</label>
      <textarea id="description" v-model="formData.description" />
    </div>
    <div>
      <label for="status">ステータス</label>
      <select id="status" v-model="formData.status">
        <option value="waiting">waiting</option>
        <option value="working">working</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <button @click="onSubmit">更新する</button>
  </form>
</template>
