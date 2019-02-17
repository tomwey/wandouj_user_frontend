import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private users: Users,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout() {
    this.alertCtrl.create({
      title: "退出登录",
      subTitle: "您确定吗？",
      buttons: [
        {
          role: "Cancel",
          text: "取消"
        },
        {
          text: "确定",
          handler: () => {
            this.users.logout()
              .then(data => {
                this.app.getRootNavs()[0].setRoot(LoginPage);
              });
          }
        }
      ]
    }).present();
  }

  updatePassword() {
    this.navCtrl.push("UpdatePasswordPage", { account: this.navParams.data.account });
  }

}
