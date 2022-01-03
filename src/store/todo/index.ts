import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, TodoState, TodoStore, Params } from '@/store/todo/types'

// ①
const mockTodo: Todo[] = [
  {
    id: 1,
    title: 'todo1',
    description: '1つ目',
    status: 'waiting',
    createdAt: '2022/01/01',
    updatedAt: '2022/01/01'
  },
  {
    id: 2,
    title: 'todo2',
    description: '2つ目',
    status: 'waiting',
    createdAt: '2022/01/01',
    updatedAt: '2022/01/01'
  },
  {
    id: 3,
    title: 'todo3',
    description: '3つ目',
    status: 'working',
    createdAt: '2022/01/01',
    updatedAt: '2022/01/01'
  }
]

// ②
const state = reactive<TodoState>({
  todos: mockTodo
})

// ③
const intitializeTodo = (todo: Params) => {
  const date = new Date()
  return {
    id: date.getTime(),
    title: todo.title,
    description: todo.description,
    status: todo.status,
    createdAt: '2022/01/01',
    updatedAt: '2022/01/01'
  } as Todo
}

// ④
const getTodo = (id: number): Todo => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  return todo
}

// ⑤
const addTodo = (todo: Params): void => {
  state.todos.push(intitializeTodo(todo))
}

// ⑥
const updateTodo = (id: number, todo: Todo): void => {
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  state.todos[index] = todo
}

// ⑦
const deleteTodo = (id: number): void => {
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo
}

export default todoStore

// ⑧
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
