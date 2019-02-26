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

    let state = (this.filterItems[0].value || {}).value;
    let merch_id = (this.filterItems[1].value || {}).value;

    this.users.GetSalaries(state, merch_id)
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

  selectFilterItem(item, callback) {
    if (item.field == "state") {
      let temp = [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '待发放',
          value: '0'
        },
        {
          label: '已发放',
          value: '1'
        }
      ];
      if (callback) {
        callback(temp);
      }
    } else if (item.field == "merch_id") {
      this.users.GetCommCompanies()
        .then(data => {
          // console.log(data);
          let temp = [{ label: '全部', value: null }];
          let arr = data['data'];
          arr.forEach(ele => {
            temp.push({ label: ele.alias_name, value: ele.id });
          });
          if (callback) {
            callback(temp);
          }
        })
        .catch(error => {

        });
    }
  }

  selectedFilterItem(item) {
    this.loadSalariesData();
  }

  totalMoney: any = "0.00";

  filterItems: any = [
    {
      name: '发放状态',
      field: 'state',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    },
    {
      name: '所属人力公司',
      field: 'merch_id',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    }
  ];

}
