import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';

/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {

  user: any = {
    unpayed_money: '--',
    payed_money: '--',
    total_money: '--',
  };

  error: any = null;
  dataType: any = '0';
  salaryData: any = [];

  // @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private iosFixed: iOSFixedScrollFreeze,
    private users: Users,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalaryPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadUserData();
    this.loadSalariesData();
  }

  loadUserData() {
    this.users.GetUserProfile(false, '')
      .then(data => {
        if (data && data['data']) {
          this.user = data['data'];
        }
      })
      .catch(error => {

      });

  }

  loadSalariesData() {
    this.error = null;
    this.salaryData = [];

    this.users.GetSalaries(this.dataType, true)
      .then(data => {
        if (data && data['data']) {
          this.salaryData = data['data'];
          this.error = this.salaryData.length == 0 ? '暂无工资数据' : null;
        } else {
          this.error = '非法错误';
        }
      })
      .catch(error => {
        this.error = error.message || '服务器出错了~';
      });
  }

  segmentChanged(ev) {
    this.loadSalariesData();
  }

}
