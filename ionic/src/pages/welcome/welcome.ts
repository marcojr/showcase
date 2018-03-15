import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TextViewPage } from "../text-view/text-view";
import { GlobalProvider } from "../../providers/global/global";
import { SignUpPage } from "../sign-up/sign-up";
import { RegistrationProvider} from "../../providers/registration/registration";
import { SessionProvider } from "../../providers/session/session";
import { ReqLogin} from "../../interfaces/session";
import { Platform } from 'ionic-angular';
import { HomePage } from "../home/home";
import { DeviceInfo } from "../../interfaces/app";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {
  retry: boolean = false;
  loginMode = false;
  login = {
    username: "",
    password: ""
  };
  displayLogin: boolean = false;
  hideFooter: boolean = false;
  @ViewChild('usernameInput') usernameInput;
  @ViewChild('passwordInput') passwordInput;
  constructor(public navCtrl: NavController, public gp: GlobalProvider,
              public registrationProvider: RegistrationProvider,
              public sessionProvider: SessionProvider,
              public platform: Platform) {
  }
  ngOnInit() {
    this.registrationProvider.getReady()
      .subscribe( res => {
        if(this.retry) {
          this.gp.dismissLoader();
        }
          this.retry = false;
          this.gp.app = {
            countries : res.data.countries,
            venues : res.data.venues,
            texts :  res.data.texts,
            privacyOptions: res.data.privacyOptions
          }
        },
        (error) =>{
          if(!this.retry) {
            this.retry = true;
            this.gp.presentLoader("Our systems are facing difficulties. Please wait or come back later...");
          }
          setTimeout(() =>{
            this.ngOnInit();
          },10 * 1000);
        });
  }
  touchLogin(){
    this.loginMode = true;
    setTimeout(() =>{
      this.usernameInput.setFocus();
      this.displayLogin = true;
    },500);
  }
  touchSignUp(){
    this.navCtrl.push(TextViewPage, {
      title: 'Terms',
      button: 'I agree',
      buttonFunction : () => {
        this.gp.rootPage = SignUpPage;
      },
      text : this.gp.app.texts.tos
    });
  }

  touchLogMeIn(){
      let di: DeviceInfo = {
          platformName: this.platform.is('android') ? 'Android' : 'iOS',
          displayWidth: this.platform.width(),
          displayHeight: this.platform.height()
      }
      let loginInfo: ReqLogin = {
          usernameOrMobile : this.login.username,
          password: this.login.password,
          appVersion: this.gp.appVersion,
          localRnd: this.gp.localRnd,
          appType: "WebMobile",
          deviceInfo : di
      }
      this.sessionProvider.login(loginInfo).subscribe((result) =>{
        this.gp.writeLocalDB('user',result.data);
        this.gp.user = result.data;
        this.gp.rootPage = HomePage;
      },
          (e) =>{
          if(e.error.code === 'INVALID_CREDENTIALS') {
              this.gp.showNotification('Invalid Credentials','alertError');
          }
      });
  }
  touchCancelLogin() {
    this.displayLogin = false;
    setTimeout(() =>{
      this.loginMode = false;
      this.hideFooter = false

    },500);
  }
}
