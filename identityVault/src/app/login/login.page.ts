import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AuthVaultService } from '../servies/auth-vault.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  state = {
    email: '',
    password: '',
  }

  constructor(
    private authVaultService: AuthVaultService,
    private navCtrl: NavController,
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    // Check if we have data in our vault and skip the login
    const isEmpty = await this.authVaultService.isEmpty()

    if (!isEmpty) {
      await this.authVaultService.unlockVault()
      this.navCtrl.navigateForward('/home', { replaceUrl: true })
    }
  }

  async login() {
    await this.authVaultService.login()
    this.navCtrl.navigateForward('/home', { replaceUrl: true })
  }
}
