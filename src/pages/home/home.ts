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

  company: any = {
    name: "--",
    avatar: "assets/imgs/default_avatar.png",
    vip_time: "--",
    balance: "--",
    left_days: "",
    account: {
      name: "--",
      mobile: "--"
    }
  };

  statData: any = {
    totalJobs: 0,
    totalJobUsers: 0,
    totalEarn: '0.00',
    agentEarn: '0.00'
  }

  error: any = null;
  features: any = [];

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

    // this.loadUserData();
    // this.loadSalariesData();
    this.loadAccountInfo();

    this.loadFeatures();
  }

  loadAccountInfo() {
    this.users.GetAccountInfo()
      .then(data => {
        // console.log(data);
        const accountInfo = data['data'];
        if (accountInfo) {
          this.company.name = accountInfo.merchant.name;
          this.company.avatar = accountInfo.merchant.logo;
          this.company.vip_time = accountInfo.merchant.vip_time;
          this.company.balance = accountInfo.merchant.balance;
          this.company.left_days = accountInfo.merchant.left_days;
          this.company.account.name = accountInfo.name;
          this.company.account.mobile = accountInfo.mobile;
          this.company.account.is_admin = accountInfo.is_admin;
        }
      })
      .catch(err => { });
  }

  loadFeatures() {
    this.users.GetFeatures()
      .then(data => {
        this.features = data['data'];
        this.error = this.features.length === 0 ? "还未开通任何功能，请联系贵公司管理员！" : null;
      })
      .catch(error => {
        this.error = error.message || "服务器超时";
      })
  }

  select(feature) {
    console.log(feature);

    const isAdmin = this.company.account.is_admin;
    const can_create = isAdmin || feature.actions.indexOf('create') !== -1;
    const can_update = isAdmin || feature.actions.indexOf('update') !== -1;
    const can_delete = isAdmin || feature.actions.indexOf('delete') !== -1;
    const actions = { can_create: can_create, can_update: can_update, can_delete: can_delete };

    switch (feature.code) {
      case 1001:
        this.navCtrl.push("ProjectListPage", { actions: actions });
        break;
      case 1002:
        this.navCtrl.push("JobListPage", { actions: actions });
        break;
      case 1003:
        this.navCtrl.push("AccountPage", { actions: actions });
        break;
      case 1006:
        this.navCtrl.push("SettingPage", { account: this.company.account });
        break;
      case 1004:
        this.navCtrl.push("CrudPage", { title: "一级代理", actions: actions, resource: "channels" })
        break;
      case 1005:
        this.navCtrl.push("CrudPage", { title: "签到联系人", actions: actions, resource: "contacts" })
        break;
      default:
        console.log("未找到页面");
    }
  }

}
