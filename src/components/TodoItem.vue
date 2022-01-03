<script lang="ts" setup>
import { useFormatDate } from '@/composables/use-formate-date'
import { Todo } from '@/store/todo/types'

type Props = {
  todo: Todo;
};
const props = defineProps<Props>()

type Emits = {
  (e: 'click-title'): void;
  (e: 'click-delete', id: number): void
};
const emit = defineEmits<Emits>()

const formatDate = useFormatDate(props.todo.createdAt)
</script>

<template>
  <div class="card">
    <div>
      <span class="title" @click="emit('click-title')">{{ todo.title }}</span>
      <span class="status" :class="todo.status">{{ todo.status }}</span>
    </div>
    <div class="body">作成日：{{ formatDate }}</div>
    <hr />
    <div class="action">
      <button @click="emit('click-delete', todo.id)">削除</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  border: 1px solid;
  box-shadow: 2px 2px 4px gray;
  width: 250px;
}

.title {
  font-weight: 400;
  font-size: 25px;
  padding: 5px;
}

.status {
  padding: 3px;
}

.waiting {
  background-color: #e53935;
}

.working {
  background-color: #80cbc4;
}

.completed {
  background-color: #42a5f5;
}

.pending {
  background-color: #ffee58;
}

.body {
  margin: 5px;
}

.action {
  margin: 5px;
}
</style>
