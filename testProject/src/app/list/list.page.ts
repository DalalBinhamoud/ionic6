2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  todos = []

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadStorageTodos()
  }

  async loadStorageTodos() {
    this.todos = await this.apiService.getStoredTodos()
  }
}
