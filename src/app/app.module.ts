import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
import { Users } from '../provider/Users';
import { ApiService } from '../provider/api-service';
import { AppManager } from '../provider/AppManager';
import { iOSFixedScrollFreeze } from '../provider/iOSFixedScrollFreeze';

import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
    }),
    PipesModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Utils,
    // APIs,
    Tools,
    // ApiService,
    Users,
    ApiService,
    AppManager,
    iOSFixedScrollFreeze,
  ]
})
export class AppModule { }
