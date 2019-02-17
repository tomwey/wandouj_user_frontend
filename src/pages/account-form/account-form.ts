import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the AccountFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-form',
  templateUrl: 'account-form.html',
})
export class AccountFormPage {

  title: any;

  permissionResources: any = [];

  account: any;

  controls: any = [
    {
      id: 'name',
      name: "账号名字",
      type: "2",
      required: true,
      value: null,
    },
    {
      id: 'mobile',
      name: "登录手机",
      type: "2",
      subtype: "tel",
      required: true,
      value: null
    }
  ];
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.title = this.navParams.data.title;
    if (this.navParams.data.account) {
      this.account = this.navParams.data.account;
      this.controls.forEach(control => {
        control.value = this.account[control.id];
        if (control.id === "mobile") {
          control.disabled = true;
        }
      });
    } else {
      this.controls.push({
        id: 'password',
        name: "密码",
        type: "2",
        subtype: "password",
        required: true,
        value: null
      });

      this.controls.push({
        id: 'password2',
        name: "确认密码",
        type: "2",
        subtype: "password",
        required: true,
        value: null
      });
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AccountFormPage');
    setTimeout(() => {
      if (!this.account || !this.account.is_admin) {
        this.loadPermissionResources();
      }
    }, 200);
  }

  loadPermissionResources() {
    this.users.GetPermissionResources(this.account && this.account.id)
      .then(data => {
        this.permissionResources = data['data'];
        console.log(this.permissionResources);
      })
      .catch(error => { });
  }

  selectItem(res, action) {
    // console.log(res);
    // console.log(action);
    const index = res.selected_actions.indexOf(action.code);
    if (index !== -1) {
      res.selected_actions.splice(index, 1);
    } else {
      res.selected_actions.push(action.code);
    }
  }

  save() {
    // console.log(this.controls);

    let account_id = null;
    if (this.account) {
      account_id = this.account.id;
    }

    let params = { account_id: account_id };

    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      params[control.id] = control.value;
    }

    if (!this.account) {
      if (params['password'].length < 6) {
        this.tools.showToast(`密码太短，至少6位`);
        return;
      }

      if (params['password'] !== params['password2']) {
        this.tools.showToast(`两次密码输入不一致`);
        return;
      }
    }

    if (!this.account || !this.account.is_admin) {
      // 只有新增或者编辑非管理员账号才设置权限
      let temp = [];
      this.permissionResources.forEach(res => {
        if (res.selected_actions.length > 0) {
          temp.push(`${res.code}:${res.selected_actions.join(",")}`);
        }
      });

      if (temp.length === 0) {
        this.tools.showToast("至少需要设置一个权限");
        return;
      }

      params['permissions'] = temp.join(";");
    }

    this.users.SaveAccount(params)
      .then(data => {
        this.tools.showToast("保存成功！");
        this.events.publish("reloaddata");
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器超时，请重试');
      });

    // console.log(this.permissionResources);
  }

}
