import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-text-view',
  templateUrl: 'text-view.html',
})
export class TextViewPage {
  text;
  title;
  buttonTxt;
  buttonFunction;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.text = this.navParams.data.text;
    this.title = this.navParams.data.title;
    this.buttonTxt = this.navParams.data.button;
    if(this.navParams.data.buttonFunction) {
      this.buttonFunction = this.navParams.data.buttonFunction;
    }
  }
  touchButton() {
    this.navParams.data.buttonFunction();
  }
}
