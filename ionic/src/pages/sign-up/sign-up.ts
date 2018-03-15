import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { GlobalProvider } from "../../providers/global/global";
import { TextViewPage } from "../text-view/text-view";
import { Venue, PrivacyOption } from "../../interfaces/app";
import { ReqConfirmSMS, ReqRegister } from "../../interfaces/registration";
import { AlertController } from 'ionic-angular';
import { WelcomePage } from "../welcome/welcome";
import { RegistrationProvider } from "../../providers/registration/registration";
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild("frm0") frm0: ElementRef;
  //frm1 is virtually the code confirm, so not a form. Let's step it
  @ViewChild("frm2") frm2: ElementRef;
  @ViewChild("frm3") frm3: ElementRef;
  @ViewChild('codeInput') codeInput;
  data0 = {
    mobileNumber: '7903450712' ,
    email: 'fanz@me.com',
    country: undefined,
    username: 'zemane'
  };
  data2 = {
    name: '7903450712' ,
    pass1: 'Abc1234',
    pass2: 'Abc1234'
  };
  uuidPhone: string;
  buttonText: string = 'Continue';
  code: string = '';
  fullMobileNumber: string ;
  venuesForm: Venue[] = [];
  privacyForm = [];
  currentStep: number = 0;
  lowerVisible: boolean = true;
  showPage: boolean = true;
  ctdDown: number = 0;
  base64Image: string;
  lowerPos: number = window.innerHeight - 140;
  registration: ReqRegister;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private keyboard: Keyboard, public gp: GlobalProvider,
              private alertCtrl: AlertController,
              public registrationProvider: RegistrationProvider,
              private camera: Camera) {
    this.gp.app.venues.forEach((item: Venue) => {
      let itm = item;
      itm.inUse = false;
      for (let i = 0; i < this.gp.allowedVenues.length; i++) {
        if (this.gp.allowedVenues[i] === itm.key) {
          this.venuesForm.push(itm);
        }
      }
    });
    this.gp.app.privacyOptions.forEach((item: PrivacyOption) => {
      if(item.allowOnRegistration)
        this.privacyForm.push({
          desc : item.desc,
          key : item.key,
          payLoad: item,
          selected: false
        });
    });
  }
  submitFrm0():void {
    if(!this.data0.country || !this.data0.mobileNumber || !this.data0.email || !this.data0.username){
      this.gp.showNotification("All fields are mandatory", 'alertError');
      return;
    }
    let rgMobile = new RegExp(/^\d+$/);
    if(!rgMobile.test(this.data0.mobileNumber) || this.data0.mobileNumber.length < 8 || this.data0.mobileNumber.length > 15) {
      this.gp.showNotification("Invalid mobile number", 'alertError');
      return;
    }
    let rgEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!rgEmail.test(this.data0.email)) {
      this.gp.showNotification("Invalid E-Mail", 'alertError');
      return;
    }
    let rgUsername = new RegExp(/^[0-9a-zA-Z]+$/);
    if(!rgUsername.test(this.data0.username)) {
      this.gp.showNotification("Only alphanumeric and numbers characters are allowed for username.", 'alertError');
      return;
    }
    if (!isNaN(+this.data0.username.substring(1,0)) ) {
      this.gp.showNotification("Username cannot start with a number", 'alertError');
      return;
    }
    if (this.data0.username.length > 20 || this.data0.username.length < 2) {
      this.gp.showNotification("Username must have between 2 and 15 characters", 'alertError');
      return;
    }
    this.fullMobileNumber = this.data0.country.areaCode + this.data0.mobileNumber;
    this.performAllAvailabilityChecks().then((result) => {
      let passed = true;
      for(let i=0; i < result.length;i++) {
        if(result[i].error) {
          this.gp.showNotification("Unable to proceed - Server error", 'alertError');
          break;
        }
        if(!result[i].isAvailable) {
          passed = false;
          this.gp.showNotification(result[i].textForMsg, 'alertError');
          break;
        }
      }
      if(passed) {
        this.registrationProvider.sendSMS(this.fullMobileNumber).subscribe(() =>{
            this.continue();
        },
          (e) =>{
            this.gp.showNotification("Unable to proceed - Server error", 'alertError');
          });
      }
    });
  }
  performAllAvailabilityChecks():any {
    let checks = [
      {
        endPoint : 'checkUsernameAvailability',
        bodyKey : 'username',
        textForMsg : 'Username already taken.Chose another one.',
        value : this.data0.username.toLowerCase(),
        isAvailable: false,
        error : undefined
      },
      {
        endPoint : 'checkMobileAvailability',
        bodyKey : 'mobile',
        textForMsg : 'Mobile number already in use. Try to recover your password instead',
        value : this.fullMobileNumber,
        isAvailable: false,
        error : undefined
      },
      {
        endPoint : 'checkEmailAvailability',
        bodyKey : 'email',
        textForMsg : 'E-mail already in use. Try to recover your password instead',
        value : this.data0.email,
        isAvailable: false,
        error : undefined
      }
    ];
    let checked: number = 0;
    return new Promise((resolve) => {
      checks.forEach((c) =>{
        this.registrationProvider.checkAvailability(c.endPoint,
          c.bodyKey, c.value)
          .subscribe(res => {
            c.isAvailable = res.data.isAvailable;
            checked++;
            if(checked === checks.length) { resolve(checks); }
          },
          e => {
            c.error = e.error;
            checked++;
            if(checked === checks.length) { resolve(checks); }
          });
      });
    });
  }
  confirmSMS():void {
    let smsBody: ReqConfirmSMS = {
      code : this.code,
      mobileNumber : this.fullMobileNumber
    }
    this.registrationProvider.confirmSMS(smsBody).subscribe((res) =>{
        this.uuidPhone = res.data.uuid;
        this.continue();
      },
      (e) => {
        if(e.error.code === 'INVALID_NUMBER') {
          this.gp.showNotification('Invalid Code', 'alertError');
        } else {
          this.gp.showNotification("Unable to proceed - Server error", 'alertError');
        }
    })
  }
  submitFrm2():void {
    if (this.data2.name.length > 50 || this.data2.name.length < 2) {
      this.gp.showNotification("Your name must have between 2 and 50 characters", 'alertError');
      return;
    }
    if (this.data2.pass1 === '' || this.data2.pass1 === '') {
      this.gp.showNotification("Both passwords are mandatory", 'alertError');
      return;
    }
    let rgPass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/);
    if(!rgPass.test(this.data2.pass1)) {
      this.gp.showNotification("Password must have between 4 and 12 digits and must include numbers, lower and upper letters", 'alertError');
      return;
    }
    if (this.data2.pass1 !== this.data2.pass2) {
      this.gp.showNotification("Passwords do not match", 'alertError');
      return;
    }
    this.continue();
  }
  startCountDown():void {
    this.ctdDown = 60;
    let ctdDownHandler = setInterval(() =>{
      this.ctdDown--;
      if(this.ctdDown === 0) {
        clearInterval(ctdDownHandler);
      }
    },1000);
  }
  touchSendAgain():void {
    if(this.ctdDown > 0) {
      this.gp.showNotification("Please wait a bit more.", 'alertWarning');
      return;
    }
    this.startCountDown();
  }
  submit():void {
    if (this.currentStep === 0) {
      this.frm0['ngSubmit'].emit();
    }
    if(this.currentStep === 1){
      this.confirmSMS();
    }
    if(this.currentStep === 2){
      this.frm2['ngSubmit'].emit();
    }
    if(this.currentStep === 3){
        this.continue();
        this.buttonText = "Finish Now !";
    }
    if(this.currentStep === 4){
      this.register();
    }
  }
  continue():void {
    this.showPage = false;
    setTimeout(() => {
      this.currentStep++;
      setTimeout(() => {
        this.showPage = true;
        if (this.currentStep === 1) {
          setTimeout(() => {
            this.keyboard.show();
            this.codeInput.setFocus();
            this.startCountDown();
          }, 700);
        }
      }, 500);
    }, 500);
  }
  retypeCode() {
    this.code ="";
    this.keyboard.show();
    this.codeInput.setFocus();
  }
  setLowerVisibility(v: boolean):void {
    this.lowerVisible = v;
    //setTimeout(() => this.lowerVisible = v, 400);
  }

  keyUpCode():void {
    if (this.code.length === 4) {
      this.keyboard.close();
    }
  }

  touchServiceInfo(s):void {
    this.navCtrl.push(TextViewPage, {
      title: s.name,
      button: '',
      text: s.text
    });
  }
  touchClose():void {
    let alert = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure you want to cancel the registration ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.gp.rootPage = WelcomePage
          }
        }
      ]
    });
    alert.present();
  }
  invokeCamera(fromAlbum) {
    const options: CameraOptions = {
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      allowEdit: true,
      sourceType: fromAlbum ? this.camera.PictureSourceType.PHOTOLIBRARY : this.camera.PictureSourceType.CAMERA,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = imageData;
    });
  }
  register() {
    let getPrivacySelections = () => {
      let results : PrivacyOption[] = [];
      for(let i=0 ; i < this.privacyForm.length; i++) {
        let po: PrivacyOption = this.privacyForm[i].payLoad;
        if(this.privacyForm[i].selected && this.privacyForm[i].payLoad.availableOptions.length === 3) {
          po.value = 2;
        }
        if(!this.privacyForm[i].selected && this.privacyForm[i].payLoad.availableOptions.length === 3) {
          po.value = 0;
        }
        if(this.privacyForm[i].payLoad.availableOptions.length === 2) {
          po.value = this.privacyForm[i].selected ? 2: 0;
        }
        if(po.value != 0) { results.push(po) };
      }
      return results;
    }
    let getVenuesSelections = () => {
      let results = [];
      for(let i=0 ; i < this.venuesForm.length; i++) {
        if(this.venuesForm[i].inUse) {
          results.push(this.venuesForm[i].key);
        }
      }
      return results;
    }
    let venuesSelections = getVenuesSelections();
    if(venuesSelections.length < 1) {
      this.gp.showNotification("Choose at least one venue", 'alertError');
      return;
    }
    this.registration = {
      "username": this.data0.username,
      "phoneUUID": this.uuidPhone,
      "phoneCode": this.code,
      "picture": this.base64Image ? this.base64Image : null,
      "password": this.data2.pass1,
      "name":{
        "title": "",
        "name": this.data2.name
      },
      "bio":"",
      "gender": null,
      "birthDay": null,
      "address":{
        "streetLine1":"",
        "streetLine2":"",
        "city":"",
        "stateOrCounty":"",
        "postCode":"",
        "latitude": null,
        "longitude": null,
        "country": this.data0.country
      },
      "email": this.data0.email,
      "privacyOptions": getPrivacySelections(),
      "venues" : venuesSelections,
      "tos": this.gp.app.texts.tos,
      "customData" : null
    }
    this.gp.presentLoader("Registering you...");
    this.registrationProvider.register(this.registration).subscribe((res) =>{
      this.gp.dismissLoader();
      this.gp.showNotification("Successfully Registered ! Please login.", 'alertOk');
      this.gp.rootPage = WelcomePage;
    }, (e) =>{
      this.gp.dismissLoader();
      this.gp.showNotification("An error has occurred while creating your record.", 'alertError');
    });
  }
}
