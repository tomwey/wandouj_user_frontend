import { Component, ViewChild } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, Content, App } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
// import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
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

  controls: any = [
    {
      id: 'mobile',
      name: '手机号',
      type: 2,
      subtype: 'tel',
      required: true
    },
    {
      id: 'code',
      name: '验证码',
      type: 20,
      required: true,
      mobile_field: "mobile",
      seconds: 59,
      get_code_text: "获取验证码",
      code_type: 1
    }
  ];

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

  doLogin() {
    const mobile = this.controls[0].value;
    const code = this.controls[1].value;

    this.users.Login(mobile, code)
      .then(data => {
        console.log(data);
        // this.checkProfile();
        if (!data['pid']) {
          this.app.getRootNavs()[0].setRoot('ProfilePage');
        } else {
          this.app.getRootNavs()[0].setRoot(TabsPage);
        }
      })
      .catch(error => {
        this.tools.showToast(error);
      });
  }

  openPage() {
    this.app.getRootNavs()[0].push('CommWebPage', { title: '用户使用协议', slug: 'agreement' });
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

}
