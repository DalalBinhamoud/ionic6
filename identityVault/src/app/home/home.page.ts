import { Component } from '@angular/core'
import { AuthVaultService } from '../servies/auth-vault.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myInput = ''
  state = undefined

  constructor(private authVaultService: AuthVaultService) {
    this.state = this.authVaultService.state
  }

  async logout() {
    await this.authVaultService.logout()
  }

  savePrivateData() {
    this.authVaultService.setPrivateData(this.myInput)
  }

  lockVault() {
    this.authVaultService.lockVault()
  }

  unlockVault() {
    this.authVaultService.unlockVault()
  }
}
