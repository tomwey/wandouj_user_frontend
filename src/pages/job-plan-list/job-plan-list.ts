import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the JobPlanListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-plan-list',
  templateUrl: 'job-plan-list.html',
})
export class JobPlanListPage {

  job: any = null;
  plans: any = [];
  error: any = null;

  maxDate: any = '';

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private users: Users,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.job = this.navParams.data.job || {};
    // this.plans = this.job.plans || [];
    this.events.subscribe("reloaddata", () => {
      this.loadPlans();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobPlanListPage');
    setTimeout(() => {
      this.loadPlans();
    }, 300);
  }

  loadPlans() {
    this.users.GetJobPlans(this.job.id)
      .then(data => {
        this.plans = data['data'];
        this.error = this.plans.length === 0 ? '暂无计划' : null;

        this.calcMaxDate();
      })
      .catch(error => {
        this.error = error.message || "服务器出错了";
      })
  }

  calcMaxDate() {
    if (this.plans.length > 0) {
      let arr = JSON.parse(JSON.stringify(this.plans));
      arr = arr.sort((a, b) => {
        return a.work_date > b.work_date ? -1 : a.work_date < b.work_date ? 1 : 0;
      });
      // console.log(arr);
      // this.maxDate = arr[0].work_date;

      let mydate = new Date(arr[0].work_date);
      mydate.setDate(mydate.getDate() + 1);
      this.maxDate = Utils.dateFormat(mydate);
    }
  }

  newItem() {
    // this.navCtrl.push("JobPlanBatchFormPage", { title: "新建兼职计划" });
    this.navCtrl.push('JobPlanBatchFormPage', { job: this.job, maxDate: this.maxDate });
  }

  editItem(item) {
    this.navCtrl.push("JobPlanFormPage", { title: "编辑兼职计划", job: this.job, plan: item });
  }

  deleteItem(item) {
    this.alertCtrl.create({
      title: "删除提示",
      subTitle: "您确定要删除吗？",
      buttons: [
        {
          role: "Cancel",
          text: "取消"
        },
        {
          text: "确定",
          handler: () => {
            this.users.DeletePlan(this.job.id, item.id)
              .then(data => {
                this.tools.showToast("删除成功！");
                this.loadPlans();
              })
              .catch(error => {
                this.tools.showToast(error.message || "服务器超时，请重试");
              });
          }
        }
      ]
    }).present();
  }

}
