import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  controls: any = [
    {
      id: 'name',
      name: '姓名',
      type: 2,
      required: true
    },
    {
      id: 'mobile',
      name: '联系电话',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'sex',
      name: '性别',
      type: 4,
      required: true,
    },
    {
      id: 'age',
      name: '年龄',
      type: 2,
      subtype: 'tel',
      required: true
    },
    {
      id: 'current_pay_name',
      name: '支付宝姓名',
      type: 2,
      required: true,
      placeholder: "输入支付宝实名认证姓名"
    },
    {
      id: 'current_pay_account',
      name: '支付宝账号',
      type: 2,
      required: true
    },
    {
      id: 'college',
      name: '大学',
      type: 2
    },
    {
      id: 'specialty',
      name: '专业',
      type: 2
    },
    {
      id: 'height',
      name: '身高',
      type: 2,
      subtype: 'tel',
      unit: '厘米'
    },
    {
      id: 'weight',
      name: '体重',
      type: 2,
      subtype: 'tel',
      unit: '公斤'
    },
    {
      id: 'address',
      name: '住址',
      type: 2
    }
  ];
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
    setTimeout(() => {
      this.loadProfile();
    }, 300);
  }

  loadProfile() {
    this.users.GetUserProfile(true, "加载中...")
      .then(data => {
        this.fillControls(data['data'] || {});
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器出错了~");
      });
  }

  private fillControls(profile) {
    if (profile.pid) {
      this.controls.forEach(control => {
        control.value = profile[control.id];
        if (control.id == "mobile") {
          control.value = profile.phone;
        }
      });
    }
  }

  save() {
    let params = {};
    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      params[control.id] = control.value;
    }

    this.users.SaveProfile(params)
      .then(data => {
        // this.tools.showToast("保存成功");
        if (this.navParams.data.from) {
          this.navCtrl.pop();
        } else {
          this.app.getRootNavs()[0].setRoot(TabsPage);
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "保存失败了，请重试");
      });
  }

}
