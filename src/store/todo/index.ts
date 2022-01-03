import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, TodoState, TodoStore, Params } from '@/store/todo/types'
import RepositoryFactory, { TODOS } from '@/clients/RepositoryFactory'
const TodoRepository = RepositoryFactory[TODOS]

const state = reactive<TodoState>({
  todos: []
})

const fetchTodos = async (): Promise<void> => {
  state.todos = await TodoRepository.getAll()
}

const fetchTodo = async (id: number): Promise<void> => {
  const todo = await TodoRepository.get(id)
  state.todos.push(todo)
}

const getTodo = (id: number): Todo => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  return todo
}

const addTodo = async (todo: Params): Promise<void> => {
  const result = await TodoRepository.create(todo)
  state.todos.push(result)
}

const updateTodo = async (id: number, todo: Todo): Promise<void> => {
  const result = await TodoRepository.update(id, todo)
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  state.todos[index] = result
}

const deleteTodo = async (id: number): Promise<void> => {
  await TodoRepository.delete(id)
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  fetchTodos,
  fetchTodo,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo
}

export default todoStore

// ⑧
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
