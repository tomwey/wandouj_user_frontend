import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Users } from '../provider/Users';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { Utils } from '../provider/Utils';
// import { Tools } from '../provider/Tools';
// import { AppManager } from '../provider/AppManager';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;// = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar,
    private users: Users,
    // private tools: Tools,
    // private appManager: AppManager,
    // private wechat: Wechat,
    splashScreen: SplashScreen) {

    this.loginIfNeeded();

    // this.rootPage = 'UserProfilePage';

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();

      // this.loginIfNeeded();
    });
  }

  loginIfNeeded() {
    this.users.token().then(token => {
      // console.log(token);
      // console.log('###########');
      if (!token) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = TabsPage;
      }
    })
  }

}
