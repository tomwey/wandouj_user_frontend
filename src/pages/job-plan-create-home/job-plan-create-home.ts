import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JobPlanCreateHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-plan-create-home',
  templateUrl: 'job-plan-create-home.html',
})
export class JobPlanCreateHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobPlanCreateHomePage');
  }

  singleCreate() {
    this.navCtrl.push('JobPlanFormPage', { job: this.navParams.data.job, title: '新建兼职计划' });
  }

  batchCreate() {
    this.navCtrl.push('JobPlanBatchFormPage', { job: this.navParams.data.job });
  }

}
