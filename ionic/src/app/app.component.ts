import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { WelcomePage } from "../pages/welcome/welcome";


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public gp: GlobalProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      //localRnd
        this.gp.localRnd = Math.random();
        this.gp.readLocalDB('localRnd').then(localRnd => {
          if(localRnd === null) {
              this.gp.writeLocalDB('localRnd',this.gp.localRnd );
              this.gp.localRnd = localRnd;
          }
            this.gp.readLocalDB('user').then(user => {
                if(user === null) {
                    this.gp.rootPage = WelcomePage;
                }
                else {
                  this.gp.user = user;
                  this.gp.rootPage = HomePage;
                }
            });
        });
    });
  }
}

