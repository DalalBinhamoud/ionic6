import { Component } from '@angular/core'
import { RefresherCustomEvent } from '@ionic/angular'
import homeData from '../../assets/data/home.json'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  videos = []
  segments = []

  constructor() {
    this.segments = [
      'All',
      'New to yo',
      'Gaming',
      'sitcomes',
      'Programming',
      'Musice',
    ].map((val) => ({
      title: val,
      selected: false,
    }))

    setTimeout(() => {
      this.selectedSegment(0)
      this.videos = homeData
    }, 5000)
  }

  selectedSegment(index: number) {
    this.segments.map((seg) => (seg.selected = false))
    this.segments[index].selected = true
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete()
    }, 1500)
  }
}
