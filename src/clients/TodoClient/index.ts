import { Todo, Params } from '@/store/todo/types'
import { TodoClientInterface } from './types'

export class TodoClient implements TodoClientInterface {
  intitializeTodo (todo: Params) {
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

  async getAll () {
    // suspenseのfallback試し用
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return Promise.resolve(
      Object.keys(localStorage)
        .filter(key => !isNaN(Number(key)))
        .map(key => (JSON.parse(localStorage.getItem(key) as string)) as Todo)
    )
  }

  get (id: number) {
    const item = localStorage.getItem(String(id))

    // 型ガード
    if (item === null) {
      return Promise.reject(new Error(`id: ${id} is not found`))
    }

    // parseでjsonをオブジェクトに変換
    return Promise.resolve(JSON.parse(item) as Todo)
  }

  create (params: Params) {
    const todo = this.intitializeTodo(params)
    localStorage.setItem(String(todo.id), JSON.stringify(todo))
    return Promise.resolve(todo)
  }

  update (id: number, todo: Todo) {
    localStorage.removeItem(String(id))
    localStorage.setItem(String(id), JSON.stringify(todo))
    return Promise.resolve(todo)
  }

  delete (id: number) {
    localStorage.removeItem(String(id))
    return Promise.resolve()
  }
}
