import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App, User } from "../../interfaces/app";
import { ToastController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
@Injectable()
export class GlobalProvider {
  rootPage;
  backend = {
    servers: {
      dev: 'http://localhost:4600',
      myLaptop : 'http://192.168.1.47:4600',
      use: 'dev'
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
      },
      session : {
          login : '/v1/session/login',
          logout : '/v1/session/logout'
      }
    }
  };
  load:Loading;
  app:App;
  localRnd;
  user: User;
  appVersion: number = 0.1;
  allowedVenues: string [] = ['B651','B652','B653'];
  backendServer: string = this.backend.servers[this.backend.servers['use']];

  constructor(public http: HttpClient, public toastCtrl: ToastController,
              public loading: LoadingController, private storage: Storage) {

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
    writeLocalDB(key: string, data: any) {
        return this.storage.set(key, data);
    }

    readLocalDB(key: string): any {
        return this.storage.get(key);
    }

    deleteLocalDB(key: string): any {
        return this.storage.remove(key);
    }
}
