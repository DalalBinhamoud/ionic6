import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.page.html',
  styleUrls: ['./sheet.page.scss'],
})
export class SheetPage implements OnInit {
  items = [
    {
      icon: 'videocam-outline',
      text: 'Create a Short',
    },
    {
      icon: 'push-outline',
      text: 'Upload a video',
    },
    {
      icon: 'radio-outline',
      text: 'Go live',
    },
    {
      icon: 'add-circle-outline',
      text: 'Add to your story',
    },
    {
      icon: 'create-outline',
      text: 'Create a post',
    },
  ]

  constructor(private modalCtrl: ModalController) {}
  dismiss() {
    this.modalCtrl.dismiss()
  }

  ngOnInit() {}
}
