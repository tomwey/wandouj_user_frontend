import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the JobListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  actions: any;
  error: any = null;
  jobs: any = [];

  constructor(public navCtrl: NavController,
    private events: Events,
    private tools: Tools,
    private users: Users,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.events.subscribe("reloaddata", () => {
      this.loadJobs();
    })

    this.actions = this.navParams.data.actions || {};
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobListPage');
    setTimeout(() => {
      this.loadJobs();
    }, 300);
  }

  loadJobs() {
    this.users.GetJobs()
      .then(data => {
        this.jobs = data['data'];
        this.error = this.jobs.length === 0 ? '暂无兼职' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

  newItem() {
    this.navCtrl.push("JobFormPage", { title: "新建兼职" });
  }

  editItem(item) {
    this.navCtrl.push("JobFormPage", { title: "编辑兼职", job: item });
  }

  viewPlans(item) {
    this.navCtrl.push("JobPlanListPage", { job: item });
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
            this.users.DeleteJob(item.id)
              .then(data => {
                this.tools.showToast("删除成功！");
                this.loadJobs();
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
