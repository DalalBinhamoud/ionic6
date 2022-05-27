import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  tweets = []
  segment = 'home'
   slideOpts = {
    slidesPerView: 3.5,
    
    }

  constructor(private http: HttpClient) {
    this.http
      .get(
        'https://devdactic.fra1.digitaloceanspaces.com/twitter-ui/tweets.json',
      )
      .subscribe((data: any) => {
        console.log(data)

        this.tweets = data.tweets
      })
  }

  onSegmentChange(value: string) {
    this.segment = value
  }
}
