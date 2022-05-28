import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { HomePage } from './home.page'

describe('HomePage', () => {
  let component: HomePage
  let fixture: ComponentFixture<HomePage>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule.forRoot()],
      }).compileComponents()

      fixture = TestBed.createComponent(HomePage)
      component = fixture.componentInstance
      fixture.detectChanges()
    }),
  )

  afterEach(() => {
    localStorage.removeItem('todos')
    component = null
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have empty array', () => {
    component.loadTodos()
    expect(component.todos).toEqual([])
  })

  it('should have one object', () => {
    const arr = ['first', 'sec']
    localStorage.setItem('todos', JSON.stringify(arr))
    component.loadTodos()
    expect(component.todos).toEqual(arr)
    expect(component.todos).toHaveSize(arr.length)
  })
})
