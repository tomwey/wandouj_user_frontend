import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the FilterSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-select',
  templateUrl: 'filter-select.html',
})
export class FilterSelectPage {

  title: any = '';
  data: any = [];
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.title = this.navParams.data.title;
    this.data = this.navParams.data.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FilterSelectPage');
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  selectItem(item) {
    this.viewCtrl.dismiss(item);
  }

}
