import { Injectable } from '@angular/core'
import { Storage } from '@capacitor/storage'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getStoredTodos(): Promise<any[]> {
    const data = await Storage.get({ key: 'mytodos' })

    if (data.value && data.value !== '') {
      return JSON.parse(data.value)
    } else {
      return []
    }
  }

  async addTodo(todo) {
    const todos = await this.getStoredTodos()
    todos.push(todo)
    return await Storage.set({ key: 'mytodos', value: JSON.stringify(todos) })
  }

  async removeTodo(index) {
    const todos = await this.getStoredTodos()
    todos.splice(index, 1)
    return await Storage.set({ key: 'mytodos', value: JSON.stringify(todos) })
  }
}
