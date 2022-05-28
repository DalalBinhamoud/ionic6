import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { IonCard, IonicModule, IonItem } from '@ionic/angular'
import { Storage } from '@capacitor/storage'

import { ListPage } from './list.page'
import { ApiService } from '../services/api.service'

describe('ListPage', () => {
  let component: ListPage
  let fixture: ComponentFixture<ListPage>
  let service: ApiService

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents()

      fixture = TestBed.createComponent(ListPage)
      component = fixture.componentInstance
      fixture.detectChanges()
      service = TestBed.inject(ApiService)
    }),
  )

  // below commented code similar to e2e testing/ UI testing
  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })

  // it('should display empty card intially', () => {
  //   const el = fixture.debugElement.query(By.directive(IonCard))
  //   expect(el).toBeDefined()
  //   expect(el.nativeElement.textContent.trim()).toEqual('No todos found')
  // })

  // it('should todos after adding new items', () => {
  //   const arr = ['a', 'b', 'c', 'd']

  //   let el = fixture.debugElement.query(By.directive(IonCard))
  //   expect(el).toBeDefined()
  //   expect(el.nativeElement.textContent.trim()).toEqual('No todos found')

  //   component.todos = arr

  //   fixture.detectChanges()

  //   el = fixture.debugElement.query(By.directive(IonCard))
  //   expect(el).toBeNull()

  //   let items = fixture.debugElement.queryAll(By.directive(IonItem))
  //   expect(items.length).toEqual(arr.length)
  // })

  //opt1

  it('should load async todos', (done) => {
    const arr = ['a', 'b', 'c']
    const spy = spyOn(service, 'getStoredTodos').and.returnValue(
      Promise.resolve(arr),
    )

    component.loadStorageTodos()
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.todos).toEqual(arr)
      expect(component.todos).toBe(arr)
      done()
    })
  })

  //opt2

  it(
    'should load async todos',
    waitForAsync(() => {
      const arr = ['a', 'b', 'c']
      const spy = spyOn(service, 'getStoredTodos').and.returnValue(
        Promise.resolve(arr),
      )

      component.loadStorageTodos()

      fixture.whenStable().then(() => {
        expect(component.todos).toEqual(arr)
        expect(component.todos).toBe(arr)
      })
    }),
  )

  //opt3

  it('should load async todos', fakeAsync(() => {
    const arr = ['a', 'b', 'c']
    const spy = spyOn(service, 'getStoredTodos').and.returnValue(
      Promise.resolve(arr),
    )

    component.loadStorageTodos()
    tick()

    expect(component.todos).toEqual(arr)
    expect(component.todos).toBe(arr)
  }))
})
