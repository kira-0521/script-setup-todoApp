<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import todoStore, { todoKey } from './store/todo'

export default defineComponent({
  name: 'App',
  setup () {
    provide(todoKey, todoStore)
  }
})
</script>
