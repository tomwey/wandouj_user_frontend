import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';
import { LoginPage } from '../login/login';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {

  account: any = null;

  controls: any = [
    {
      id: 'mobile',
      name: "登录手机",
      type: 2,
      subtype: "tel",
      required: true,
    },
    {
      id: 'code',
      name: "验证码",
      type: 20,
      required: true,
      mobile_field: "mobile",
      seconds: 59,
      get_code_text: "获取验证码",
      code_type: 7
    },
    {
      id: 'password',
      name: '新密码',
      type: 2,
      subtype: "password",
      required: true
    },
    {
      id: 'password2',
      name: '确认密码',
      type: 2,
      subtype: "password",
      required: true
    }
  ];
  constructor(public navCtrl: NavController,
    private tools: Tools,
    private users: Users,
    private app: App,
    public navParams: NavParams) {
    if (this.navParams.data.account) {
      this.account = this.navParams.data.account;

      this.controls[0].value = this.account.mobile;
      this.controls[0].disabled = true;
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UpdatePasswordPage');
  }

  save() {
    let params = { code_type: 7 };
    for (let i = 0; i < this.controls.length; i++) {
      let control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      params[control.id] = control.value;
    }

    if (params['password'].length < 6) {
      this.tools.showToast(`密码太短，至少为6位`);
      return;
    }

    if (params['password'] !== params['password2']) {
      this.tools.showToast(`两次密码输入不一致`);
      return;
    }

    this.users.UpdatePassword(params)
      .then(data => {
        this.tools.showToast("密码修改成功!");
        this.users.logout()
          .then(() => {
            this.app.getRootNavs()[0].setRoot(LoginPage);
          });
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器超时，请重试");
      });
  }

}
