import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, Events } from 'ionic-angular';
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
      subtype: 'tel',
      placeholder: "如果不填，默认为登录手机"
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

  profile: any = null;
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private app: App,
    private events: Events,
    private modalCtrl: ModalController,
    public navParams: NavParams) {

    this.profile = this.navParams.data.profile;
    this.fillControls(this.profile);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

  private fillControls(profile) {
    if (profile.pid) {
      this.controls.forEach(control => {
        control.value = profile[control.id];
        if (control.id == "mobile") {
          control.value = profile.phone;
        }

        if (control.id == "current_pay_name") {
          control.value = profile["pay_name"];
        }

        if (control.id == "current_pay_account") {
          control.value = profile["pay_account"];
        }
      });
    }
  }

  controlSelected(control) {
    let modal = this.modalCtrl.create('CommSelectPage', {
      selectedItems: control.value ? [control.value] : [],
      title: '选择兼职项目', data: [{ label: "男", value: "男" }, { label: "女", value: "女" }]
    });
    modal.onDidDismiss((res) => {
      // console.log(res);
      if (!res) return;

      // this.selectedItems = res;
      if (res.length > 0) {
        // console.log(res[0]);
        control.value = res[0];
      }
    });
    modal.present();
  }

  save() {
    let params = {};
    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      if (control.type == 4) {
        params[control.id] = control.value ? control.value.value : "";
      } else {
        params[control.id] = control.value;
      }
    }

    this.users.SaveProfile(params)
      .then(data => {
        // this.tools.showToast("保存成功");
        if (this.profile) {
          this.events.publish("reloadprofile");
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
