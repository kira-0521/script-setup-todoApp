<script lang="ts" setup>
import { todoKey } from '@/store/todo'
import { Params } from '@/store/todo/types'
import { inject, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const todoStore = inject(todoKey)
if (!todoStore) {
  throw new Error('todoStore is not provided')
}

const router = useRouter()

const data = reactive<Params>({
  title: '',
  description: '',
  status: 'waiting'
})
const { title, description, status } = toRefs(data)

const onSubmit = () => {
  const { title, description, status } = data
  todoStore.addTodo({
    title,
    description,
    status
  })
  router.push('/')
}

</script>

<template>
<h2>Todoを作成する</h2>
<form @submit.prevent="">
  <div>
    <label for="title">タイトル</label>
    <input type="text" id="title" v-model="title">
  </div>
  <div>
    <label for="description">説明</label>
    <textarea id="description" v-model="description" />
  </div>
  <div>
    <label for="status">ステータス</label>
    <select id="status" v-model="status">
      <option value="waiting">waiting</option>
      <option value="working">working</option>
      <option value="completed">completed</option>
      <option value="pending">pending</option>
    </select>
  </div>
  <button @click="onSubmit">新規作成</button>
</form>
</template>
