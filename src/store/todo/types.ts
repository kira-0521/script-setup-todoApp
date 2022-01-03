import { DeepReadonly } from 'vue'

export type Status = 'waiting' | 'working' | 'completed' | 'pending'

export interface Todo {
  id: number
  title: string
  description: string
  status: Status
  createdAt: string
  updatedAt: string
}

export interface TodoState {
  todos: Todo[]
}

export type Params = Pick<Todo, 'title' | 'description' | 'status'>

export interface TodoStore {
  state: DeepReadonly<TodoState>
  fetchTodos: () => Promise<void>
  fetchTodo: (id: number) => Promise<void>
  getTodo: (id: number) => Todo
  addTodo: (todo: Params) => Promise<void>
  updateTodo: (id: number, todo: Todo) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}
