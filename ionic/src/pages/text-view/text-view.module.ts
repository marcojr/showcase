import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextViewPage } from './text-view';

@NgModule({
  declarations: [
    TextViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TextViewPage),
  ],
})
export class TextViewPageModule {}
