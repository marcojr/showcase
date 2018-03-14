import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { App, PrivacyOption } from "../../interfaces/app";
import { ToastController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
@Injectable()
export class GlobalProvider {
  rootPage;
  backend = {
    servers: {
      dev: 'http://localhost:4600',
      myLappy : 'http://192.168.1.47:4600',
      use: 'myLappy'
    },
    endpoints: {
      registration: {
        getReady : '/v1/registration/getReady',
        sendSMS: '/v1/registration/sendSMS',
        confirmSMS: '/v1/registration/confirmSMS',
        checkEmailAvailability : '/v1/registration/checkEmailAvailability',
        checkUsernameAvailability : '/v1/registration/checkUsernameAvailability',
        checkMobileAvailability : '/v1/registration/checkMobileAvailability',
        register : '/v1/registration/register'
      }
    }
  };
  load:Loading;
  app:App;
  appVersion: number = 0.1;
  allowedServices: string [] = ['B651','B652'];
  backendServer: string = this.backend.servers[this.backend.servers['use']];

  constructor(public http: HttpClient, public toastCtrl: ToastController,
              public loading: LoadingController) {

  }
  showNotification(msg: string, cssClass: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: cssClass
    });
    toast.present();
  }
  presentLoader(text) {
    this.load = this.loading.create({
      content: text,
    });
    this.load.present();
  }
  dismissLoader() {
    this.load.dismiss();
  }
}
