import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the JobPlanBatchFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-plan-batch-form',
  templateUrl: 'job-plan-batch-form.html',
})
export class JobPlanBatchFormPage {

  controls: any = [
    {
      id: 'start_date',
      name: '开始日期',
      type: 7,
      required: true,
      min: Utils.dateFormat(new Date()),
      value: Utils.dateFormat(new Date())
    },
    {
      id: 'days',
      name: '连续天数',
      type: 2,
      subtype: 'tel',
      required: true,
      unit: "天"
    },
    {
      id: 'total_count',
      name: '兼职需要人数',
      type: 2,
      subtype: 'tel',
      required: true,
      unit: "人"
    },
    {
      id: 'price',
      name: '当天兼职价格',
      type: 2,
      subtype: 'number',
      placeholder: '如果不填，则为兼职通用价格',
      unit: '元'
    },
    {
      id: 'opened',
      name: '是否发布上线',
      type: 8,
      value: false
    }
  ];

  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    if (this.navParams.data.maxDate) {
      this.controls[0].value = this.navParams.data.maxDate;
    } else {
      this.controls[0].value = Utils.dateFormat(new Date());
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobPlanBatchFormPage');
  }

  private _fillData(controls, params) {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return false;
      }

      params[control.id] = control.value || "";

    }

    return true;
  }

  save() {
    const job = this.navParams.data.job || {};
    let params = { job_id: job.id || "" };

    if (!this._fillData(this.controls, params)) return;

    this.users.BatchCreateJobPlan(params)
      .then(data => {
        this.events.publish("reloaddata");
        if (this.navParams.data.from) {
          // this.events.publish('reloaddata');
          // this.navCtrl.getByIndex
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
        } else {

          this.navCtrl.pop();
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "提交失败了，请重试");
      });
  }

}
