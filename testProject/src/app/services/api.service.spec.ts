import { TestBed } from '@angular/core/testing'
import { Storage } from '@capacitor/storage'

import { ApiService } from './api.service'

describe('ApiService', () => {
  let service: ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ApiService)
  })

  afterEach(() => {
    service = null
    Storage.clear()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should be empty array', async () => {
    const res = await service.getStoredTodos()
    expect(res).toEqual([])
  })

  it('have one object', async () => {
    await service.addTodo('first')

    const res = await service.getStoredTodos()

    expect(res).toEqual(['first'])
  })

  it('remove object', async () => {
    await service.addTodo('first')
    await service.addTodo('second')
    await service.addTodo('third')

    expect(await service.getStoredTodos()).toEqual(['first', 'second', 'third'])

    await service.removeTodo(1)

    expect(await service.getStoredTodos()).toEqual(['first', 'third'])
  })
})
