import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the JobPlanFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-plan-form',
  templateUrl: 'job-plan-form.html',
})
export class JobPlanFormPage {
  controls: any = [
    {
      id: 'work_date',
      name: '工作日期',
      type: 7,
      required: true,
      min: Utils.dateFormat(new Date())
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
      value: true
    }
  ];

  plan: any = null;

  constructor(public navCtrl: NavController,
    private events: Events,
    private tools: Tools,
    private users: Users,
    public navParams: NavParams) {
    if (this.navParams.data.plan) {
      this.plan = this.navParams.data.plan;

      this.controls.forEach(control => {
        control.value = this.plan[control.id];
      });
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobPlanFormPage');
  }

  save() {

    let plan = {};
    // const isNew = !this.plan;
    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`)
        return;
      }

      plan[control.id] = control.value;
      // if (!isNew) {
      //   this.plan[control.id] = control.value;
      // }
    }

    const job = this.navParams.data.job || {};
    let job_plan = this.plan || {};

    this.users.SavePlan(job.id, job_plan.id, plan)
      .then(data => {
        this.events.publish("reloaddata");
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器出错，请重试");
      });

    // if (isNew) {
    //   this.plan = plan;
    // }

    // console.log(this.plan);

    // this.events.publish("plan:saved", { is_new: isNew, plan: this.plan });
    // this.navCtrl.pop();
  }

}
