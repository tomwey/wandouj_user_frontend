import { Component, ViewChild } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, Content, App } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
// import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { HomePage } from '../home/home';
// import { TabsPage } from '../tabs/tabs';
// import { SettingPage } from '../setting/setting';
// import { Utils } from '../../provider/Utils';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {
    mobile: '',
    password: ''
  };

  codeBtnData: any = {
    text: '获取验证码',
    started: false,
    timer: null,
    seconds: 59,
  };

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private api: ApiService,
    // private san: DomSanitizer,
    private app: App,
    private users: Users,
    private iosFixed: iOSFixedScrollFreeze,
    private tools: Tools,
  ) {

  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad LoginPage');
    // this.loadUserAgreement();
  }

  updatePassword() {
    this.navCtrl.push('UpdatePasswordPage');
  }

  doLogin() {
    this.users.Login(this.user.mobile, this.user.password)
      .then(data => {
        // console.log(data);
        // this.checkProfile();
        this.app.getRootNavs()[0].setRoot(HomePage);
      })
      .catch(error => {
        this.tools.showToast(error);
      });
  }

  // checkProfile() {
  //   this.users.GetUserProfile()
  //     .then(data => {
  //       const profile = data['data'];
  //       if (!profile.pid) {
  //         this.app.getRootNavs()[0].setRoot('UserProfilePage');
  //       } else {
  //         this.app.getRootNavs()[0].setRoot(TabsPage);
  //       };
  //     })
  //     .catch(error => {
  //       this.tools.showToast(error.message || '服务器出错了');
  //     });
  // }

  getCode() {
    if (this.codeBtnData.started) return;

    this.users.GetCode(this.user.mobile)
      .then(data => {
        // console.log(data);
        this.startTimer();
      })
      .catch(error => {
        // console.log(error);
        this.tools.showToast(error.message || '服务器出错了');
      });
  }

  startTimer() {
    this.codeBtnData.started = true;
    this.codeBtnData.text = `${this.codeBtnData.seconds}秒后重新获取`;

    if (!this.codeBtnData.timer) {
      this.codeBtnData.timer = setInterval(() => {
        this.codeBtnData.seconds -= 1;
        if (this.codeBtnData.seconds <= 0) {
          clearInterval(this.codeBtnData.timer);
          this.codeBtnData.timer = null;
          this.codeBtnData.started = false;
          this.codeBtnData.seconds = 59;
          this.codeBtnData.text = '获取验证码';
        } else {
          this.codeBtnData.text = `${this.codeBtnData.seconds}秒后重新获取`;
        }
      }, 1000);
    }
  }

}
