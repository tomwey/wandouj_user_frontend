import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
// import { LoginPage } from '../login/login';
import { Tools } from '../../provider/Tools';

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

  user: any = null;

  constructor(public navCtrl: NavController,
    // private alertCtrl: AlertController,
    private users: Users,
    private app: App,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.events.subscribe("reloadprofile", () => {
      this.loadProfile();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingPage');
    setTimeout(() => {
      this.loadProfile();
    }, 100);
  }

  loadProfile() {
    this.users.GetUserProfile(true, "加载中...")
      .then(data => {
        // this.fillControls(data['data'] || {});
        this.user = data['data'];
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器出错了~");
      });
  }

  gotoProfile() {
    this.app.getRootNavs()[0].push('ProfilePage', { profile: this.user });
  }

  gotoAbout() {
    this.app.getRootNavs()[0].push('CommWebPage', { title: '关于豌豆兼', slug: 'about' });
  }

  callPhone() {
    window.open("tel:18048553687");
  }

}
