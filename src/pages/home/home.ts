import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content } from 'ionic-angular';
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

  // @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    // private api: ApiService,
    // private app: App,
    private users: Users,
    // private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadHomeData();
  }

  callPhone(phone) {
    // alert(phone);
    window.open("tel:" + phone);
  }

  loadHomeData() {
    this.users.GetUserHomeData()
      .then(data => {
        console.log(data);
        const result = data['data'];
        this.company = result.company;
        this.my_jobs = result.my_jobs;
        this.jobs = result.jobs;
      })
      .catch(error => {
        this.error = error.message || "额，服务器出错了~";
      })
  }

}
