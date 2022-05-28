import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // Basic Testing
  getTodos(): any[] {
    const result = JSON.parse(localStorage.getItem('todos'))
    return result || []
  }
}
