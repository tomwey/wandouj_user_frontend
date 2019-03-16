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

  // hasProfile: boolean = false;

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
        if (this.job.lead_mobile) {
          this.job.contacts = [{ name: this.job.lead_mobile, mobile: this.job.lead_mobile }];
        }
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

  viewMap(job) {
    if (!job || !job.address) return;

    // this.navCtrl.push('WorkMapPage', { address: job.address });
    // http://apis.map.qq.com/uri/v1/marker?marker=coord:30.595810,103.912830;title:渔虾跳主题餐吧;addr: 城南优品道广场星光广场一楼
    // window.open("https://uri.amap.com/marker?position=经度,纬度&name=所在的位置名称");
    // window.open(`https://uri.amap.com/marker?position=${job.location}&name=${encodeURI(job.address)}`);
    // window.open("http://api.map.baidu.com/marker?location=30.694057,103.945093&title=&output=html")
    this.navCtrl.push('BrowserPage', { title: "位置信息", url: `https://uri.amap.com/marker?position=${job.location}&name=${encodeURI(job.address)}` })
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
        if (error.code === 5003) {
          this.tools.showToast("资料未完善，不能报名");
          this.navCtrl.push("ProfilePage");
        } else {
          this.tools.showToast(error.message || "提交出错了，请重试！");
        }

      });
  }

}
