import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the CommWebPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comm-web',
  templateUrl: 'comm-web.html',
})
export class CommWebPage {

  page: any = {
    title: '',
    body: '',
    slug: ''
  };

  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
    this.page.title = this.navParams.data.title;
    this.page.slug = this.navParams.data.slug;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommWebPage');
  }

  ionViewDidEnter() {
    this.loadPageData();
  }

  loadPageData() {
    this.users.GetPage(this.page.slug)
      .then(data => {
        this.page.body = data['data'] && data['data']['body'];
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器出错了~");
      })
  }

}
