import { Injectable, NgZone } from '@angular/core'
import { Capacitor } from '@capacitor/core'
import {
  BrowserVault,
  Device,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault'
import { NavController } from '@ionic/angular'

const DATA_KEY = 'myData'
const TOKEN_KEY = 'myToken'

@Injectable({
  providedIn: 'root',
})
export class AuthVaultService {
  vault = Vault | BrowserVault

  config: IdentityVaultConfig = {
    key: 'com.devdactic.myvault',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Both,
    lockAfterBackgrounded: 100,
    shouldClearVaultAfterTooManyFailedAttempts: true,
    customPasscodeInvalidUnlockAttempts: 2,
    unlockVaultOnLoad: false,
  }

  state = {
    isLocked: false,
    privateData: '',
  }

  constructor(private ngZone: NgZone, private navCtrl: NavController) {
    this.vault =
      Capacitor.getPlatform() === 'web'
        ? new BrowserVault(this.config)
        : new Vault(this.config)
    this.init()
  }
  async init() {
    this.state.isLocked = await this.vault.isLocked()

    Device.setHideScreenOnBackground(true)

    // Runs when the vault is locked
    this.vault.onLock(() => {
      this.ngZone.run(() => {
        this.state.isLocked = true
        this.state.privateData = undefined
      })
    })

    // Runs when the vault is unlocked
    this.vault.onUnlock(() => {
      this.ngZone.run(async () => {
        this.state.isLocked = false
        this.state.privateData = await this.vault.getValue(DATA_KEY)
      })
    })
  }

  lockVault() {
    this.vault.lock()
  }

  unlockVault() {
    this.vault.unlock()
  }

  async login() {
    // Store your session token upon successful login
    return this.vault.setValue(TOKEN_KEY, 'JWT-value-1123')
  }

  async setPrivateData(data: string) {
    await this.vault.setValue(DATA_KEY, data)
    this.state.privateData = data
  }

  async isEmpty() {
    return this.vault.isEmpty()
  }

  async logout() {
    // Remove all stored data
    this.state.privateData = undefined
    await this.vault.clear()

    this.navCtrl.navigateRoot('/', { replaceUrl: true })
  }
}
