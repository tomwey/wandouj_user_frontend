import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the JobDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {

  job: any = null;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private alertCtrl: AlertController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobDetailPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadJob();
    }, 300);
  }

  loadJob() {
    if (!this.navParams.data.job_id) return;

    this.users.GetJob(this.navParams.data.job_id)
      .then(data => {
        // console.log(data);
        this.job = data['data'];
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器出错了~");
      });
  }

  commit(plan) {
    this._handleApply(plan, 'create');
  }

  callPhone(mobile) {
    window.open("tel:" + mobile);
  }

  cancel(plan) {
    this.alertCtrl.create({
      title: "取消提示",
      subTitle: "您确定要取消吗？",
      buttons: [
        {
          role: "Cancel",
          text: "取消"
        },
        {
          text: "确定",
          handler: () => {
            this._handleApply(plan, 'cancel');
          }
        }
      ]
    }).present();

  }

  reapply(plan) {
    this._handleApply(plan, 'reapply');
  }

  private _handleApply(plan, action) {
    this.users.HandleApply(this.job.id, plan.work_date, action)
      .then(data => {
        this.tools.showToast("提交成功");
        this.loadJob();
        if (action == 'create') {
          if (this.navParams.data.reload) {
            this.navParams.data.reload();
          }
          // this.events.publish('needreload');
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "提交出错了，请重试！");
      });
  }

}
