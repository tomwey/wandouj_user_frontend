import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content, App } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
// import { Tools } from '../../provider/Tools';
// import { Tools } from '../../provider/Tools';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  company: any = null;

  error: any = null;
  // features: any = [];
  my_jobs: any = [];
  jobs: any = [];

  jobDates: any = [];

  currentDate: any = null;

  // @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    // private api: ApiService,
    private app: App,
    private users: Users,
    // private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadHomeData();

    // console.log(new Date().getDay());
  }

  callPhone(phone) {
    // alert(phone);
    window.open("tel:" + phone);
  }

  loadHomeData(work_date = null) {
    return new Promise((resolve) => {
      this.users.GetUserHomeData(work_date)
        .then(data => {
          // console.log(data);
          let result = data['data'];
          this.company = result.company;
          this.my_jobs = result.my_jobs;
          this.jobs = result.jobs;
          this.jobDates = result.job_dates;
          resolve();
        })
        .catch(error => {
          this.error = error.message || "额，服务器出错了~";
          resolve();
        });
    });
  }

  // doRefresh(ev) {
  //   this.currentDate = null;
  //   this.loadHomeData(null)
  //     .then(() => {
  //       ev.complete();
  //     })
  // }

  selectDate(date) {
    if (!(date.has_job || date.has_apply)) return;

    if (this.currentDate == date.date) {
      this.currentDate = null;
    } else {
      this.currentDate = date.date;
    }

    this.loadHomeData(this.currentDate);
  }

  selectJob(job) {
    this.app.getRootNavs()[0].push('JobDetailPage', {
      job_id: job.id, reload: () => {
        this.loadHomeData(null);
      }
    });
  }

}
