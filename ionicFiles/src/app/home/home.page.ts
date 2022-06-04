import { Component, OnInit } from '@angular/core'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { HttpClient } from '@angular/common/http'
import { LoadingController, Platform, ToastController } from '@ionic/angular'
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera'

const IMAGE_DIR = 'stored-images'

interface LocalFile {
  name: string
  path: string
  data: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  images: LocalFile[] = []
  directoryConfig = {
    directory: Directory.Data,
    path: IMAGE_DIR,
  }

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    this.loadImages()
  }

  async loadImages() {
    this.images = []

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    })
    //await
    loading.present()

    Filesystem.readdir(this.directoryConfig)
      .then(
        (res) => {
          this.loadData(res.files)
        },
        async (error) => {
          Filesystem.mkdir(this.directoryConfig)
        },
      )
      .then(() => {
        loading.dismiss()
      })
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadData(files: string[]) {
    // files.forEach((file) => { //doesn't work with async/await
    for (let file of files) {
      const filePath = `${IMAGE_DIR}/${file}`

      const readFile = await Filesystem.readFile(this.directoryConfig)

      this.images.push({
        name: file,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      })
    }
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    })
    toast.present()
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      })

      return file.data
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath)
      const blob = await response.blob()

      return (await this.convertBlobToBase64(blob)) as string
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })

  async addImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    })

    if (image) {
      const base64Data = await this.readAsBase64(image)

      const fileName = new Date().getTime() + '.png'
      const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data,
      })

      // Reload the file list
      // Improve by only loading for the new image and unshifting array!
      this.loadImages()
    }
  }

  uploadImage() {}
  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    })
    this.loadImages()
    this.presentToast('File removed.')
  }
}
