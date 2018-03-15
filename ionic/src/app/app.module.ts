import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Keyboard} from '@ionic-native/keyboard';
import {Camera} from '@ionic-native/camera';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {WelcomePage} from "../pages/welcome/welcome";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {TextViewPage} from "../pages/text-view/text-view";
import {GlobalProvider} from '../providers/global/global';
import {RegistrationProvider} from '../providers/registration/registration';
import {StepProgressComponent} from "../components/step-progress/step-progress";
import {SessionProvider} from '../providers/session/session';

@NgModule({
    declarations: [
        MyApp,
        WelcomePage,
        HomePage,
        TextViewPage,
        SignUpPage,
        StepProgressComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        WelcomePage,
        HomePage,
        TextViewPage,
        SignUpPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Storage,
        Keyboard,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Camera,
        GlobalProvider,
        RegistrationProvider,
        SessionProvider
    ]
})
export class AppModule {
}
