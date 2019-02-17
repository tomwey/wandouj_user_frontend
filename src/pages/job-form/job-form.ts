import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events, ModalController, AlertController } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the JobFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-form',
  templateUrl: 'job-form.html',
})
export class JobFormPage {

  title: any;
  job: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private iosFixed: iOSFixedScrollFreeze,
    private events: Events,
    private users: Users,
    private tools: Tools,
    private modalCtrl: ModalController,
    // private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.title = this.navParams.data.title;

    if (this.navParams.data.job) {
      this.job = this.navParams.data.job;
    }

    let level = 2;
    if (this.job) {
      level = this.job.agent_levels;
      if (level < 2) {
        level = 2;
      }
    }

    for (let i = 0; i < level; i++) {
      const fieldMoney = `l${i}_money`;
      const fieldType = `l${i}_earn_type`;
      this.channelEarnControls.push({

        id: fieldMoney,
        name: `${i + 1}级代理提成`,
        type: 2,
        subtype: "number",
        value: this.job && this.job[fieldMoney]
      });
      let val = this.job && this.job[fieldType];
      if (val) {
        val = { label: val, value: val };
      } else {
        val = null;
      }
      this.channelEarnControls.push({
        id: fieldType,
        name: `${i + 1}级代理提成计算方式`,
        type: 4,
        value: val
      });
    }

    if (this.job) {
      this.baseControls.forEach(control => {
        if (control.id == "project") {
          control.value = { label: this.job.name, value: this.job.id };
        } else if (control.id == "price_type") {
          control.value = { label: this.job.price_type, value: this.job.price_type };
        } else if (control.id == "contacts") {
          let temp = [];
          this.job.contacts.forEach(contact => {
            temp.push({
              label: `${contact.name} ${contact.mobile}`,
              value: contact.id
            });
          });
          control.value = temp;
        } else if (control.id == "channels") {
          let temp = [];
          this.job.channels.forEach(contact => {
            temp.push({
              label: `${contact.name} ${contact.mobile}`,
              value: contact.id
            });
          });
          control.value = temp;
        } else {
          control.value = this.job[control.id];
        }
      });
    }

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobFormPage');
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  controlSelected(control) {
    console.log(control);
    if (control.id == "project") {
      this.users.GetProjects()
        .then(data => {
          const arr = data['data'];
          let temp = [];
          arr.forEach(element => {
            temp.push({ label: element.name, value: element.id });
          });

          let modal = this.modalCtrl.create('CommSelectPage', {
            selectedItems: control.value ? [control.value] : [],
            title: '选择兼职项目', data: temp
          });
          modal.onDidDismiss((res) => {
            console.log(res);
            if (!res) return;

            // this.selectedItems = res;
            if (res.length > 0) {
              console.log(res[0]);
              control.value = res[0];
            }
          });
          modal.present();
        })
        .catch(error => {
          this.tools.showToast("获取数据失败，请重试");
        });
    } else if (control.id == "price_type") {
      this.users.GetPriceTypes()
        .then(data => {
          const arr = data['data'];
          let temp = [];
          arr.forEach(element => {
            temp.push({ label: element, value: element });
          });

          let modal = this.modalCtrl.create('CommSelectPage', {
            selectedItems: control.value ? [control.value] : [],
            title: '选择价格类型', data: temp
          });
          modal.onDidDismiss((res) => {
            console.log(res);
            if (!res) return;
            // control.value = res;
            // this.selectedItems = res;
            if (res.length > 0) {
              control.value = res[0];
            }
          });
          modal.present();
        })
        .catch(error => {
          this.tools.showToast("获取数据失败，请重试");
        });
    } else if (control.id == "l0_earn_type" || control.id == "l1_earn_type") {
      this.users.GetChannelEarnTypes()
        .then(data => {
          const arr = data['data'];
          let temp = [];
          arr.forEach(element => {
            temp.push({ label: element, value: element });
          });

          let modal = this.modalCtrl.create('CommSelectPage', {
            selectedItems: control.value ? [control.value] : [],
            title: '选择代理提成计算方式', data: temp
          });
          modal.onDidDismiss((res) => {
            console.log(res);
            if (!res) return;
            // control.value = res;

            // this.selectedItems = res;
            if (res.length > 0) {
              control.value = res[0];
            }
          });
          modal.present();
        })
        .catch(error => {
          this.tools.showToast("获取数据失败，请重试");
        });
    } else if (control.id == "contacts") {
      this.users.GetContactsOrChannels("contacts")
        .then(data => {
          const arr = data['data'];
          let temp = [];
          arr.forEach(element => {
            temp.push({ label: `${element.name} ${element.mobile}`, value: element.id });
          });

          let modal = this.modalCtrl.create('CommSelectPage', {
            selectedItems: control.value || [],
            title: '选择签到联系人', data: temp, isSingle: '0'
          });
          modal.onDidDismiss((res) => {
            console.log(res);
            if (!res) return;

            // this.selectedItems = res;
            control.value = res;
          });
          modal.present();

        })
        .catch(error => {
          this.tools.showToast("获取数据失败，请重试");
        });
    } else if (control.id == "channels") {
      this.users.GetContactsOrChannels("channels")
        .then(data => {
          const arr = data['data'];
          let temp = [];
          arr.forEach(element => {
            temp.push({ label: `${element.name} ${element.mobile}`, value: element.id });
          });

          let modal = this.modalCtrl.create('CommSelectPage', {
            selectedItems: control.value || [],
            title: '选择一级代理人', data: temp, isSingle: '0'
          });
          modal.onDidDismiss((res) => {
            console.log(res);
            if (!res) return;

            // this.selectedItems = res;
            control.value = res;
          });
          modal.present();
        })
        .catch(error => {
          this.tools.showToast("获取数据失败，请重试");
        });
    }
  }

  // newPlan() {
  //   this.navCtrl.push("JobPlanFormPage", { plans: this.jobPlans });
  // }

  // editPlan(plan) {
  //   this.navCtrl.push("JobPlanFormPage", { plan: plan });
  // }

  // deletePlan(plan) {
  //   this.alertCtrl.create({
  //     title: "删除提示",
  //     subTitle: "您确定要删除吗？删除之后不能恢复",
  //     buttons: [
  //       {
  //         role: "Cancel",
  //         text: "取消"
  //       },
  //       {
  //         text: "确定",
  //         handler: () => {
  //           const index = this.jobPlans.indexOf(plan);
  //           if (index !== -1) {
  //             this.jobPlans.splice(index, 1);
  //           }
  //         }
  //       }
  //     ]
  //   }).present();

  // }

  private _fillData(controls, params) {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return false;
      }

      if (control.type == 6) {
        const arr = control.value || [];
        let temp = [];
        arr.forEach(item => {
          temp.push(item.value);
        })
        params[control.id] = temp;
      } else if (control.type == 4 || control.type == 5) {
        const obj = control.value || {};
        params[control.id] = obj.value || "";
      } else {
        params[control.id] = control.value || "";
      }

      if (control.id == "project") {
        params["project_id"] = control.value.value;
      } else if (control.id == "contacts") {
        let ids = [];
        control.value.forEach(ele => {
          ids.push(ele.value);
        });
        params["contact_ids"] = ids;
      } else if (control.id == "channels") {
        let ids = [];
        control.value.forEach(ele => {
          ids.push(ele.value);
        });
        params["top_channel_ids"] = ids;
      }
    }

    delete params["project"];
    delete params["contacts"]
    delete params["channels"]

    params["sort"] = parseInt(params["sort"] || 0);

    return true;
  }

  save() {
    let params = {};

    if (!this._fillData(this.baseControls, params)) {
      return;
    }

    if (!this._fillData(this.channelEarnControls, params)) {
      return;
    }

    console.log(params);

    let id = null;
    if (this.job) {
      id = this.job.id;
    }

    this.users.SaveJob({ id: id, payload: JSON.stringify(params) })
      .then(data => {
        const obj = data['data'];
        this.tools.showToast("保存成功");
        if (!id) {
          // 新建
          // this.navCtrl.push("JobPlan")
          // 跳到创建兼职计划页面
          const obj = data['data'];
          this.navCtrl.push('JobPlanBatchFormPage', { job: obj, from: 'JobListPage' });
        } else {
          // 编辑
          this.events.publish("reloaddata");
          this.navCtrl.pop();
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器超时，请重试");
      });
    // console.log(this.jobPlans);
  }

  baseControls: any = [
    {
      id: 'name',
      name: '兼职简介',
      type: 2,
      required: true
    },
    {
      id: 'project',
      name: '所属项目',
      type: 4,
      required: true
    },
    {
      id: 'body',
      name: '兼职描述',
      type: 3,
      required: true
    },
    {
      id: 'top_price',
      name: "回款价格",
      type: 2,
      subtype: "number",
      required: true,
      unit: "元"
    },
    {
      id: 'price',
      name: "招人价格",
      type: 2,
      subtype: "number",
      required: true,
      unit: "元"
    },
    {
      id: 'price_type',
      name: "价格类型",
      type: 4,
      required: true
    },
    {
      id: 'start_time',
      name: '上班时间',
      type: 73,
      required: true,
      value: '08:30'
    },
    {
      id: 'end_time',
      name: '下班时间',
      type: 73,
      required: true,
      value: '18:00'
    },
    {
      id: 'address',
      name: '工作地址',
      type: 2,
      required: true
    },
    {
      id: 'contacts',
      name: '签到联系人',
      type: 6,
      required: true
    },
    {
      id: 'channels',
      name: '一级代理人',
      type: 6,
      required: true
    },
    {
      id: 'sort',
      name: '排序（值越大越靠前）',
      type: 2,
      subtype: "number"
    },
    {
      id: 'opened',
      name: '是否发布上线',
      type: 8,
      value: true
    },
    {
      id: 'special',
      name: '特殊说明',
      type: 2,
      required: false
    },
    {
      id: 'memo',
      name: '备注',
      type: 3,
    }
  ];

  channelEarnControls: any = [];

  // jobPlans: any = [];

}
