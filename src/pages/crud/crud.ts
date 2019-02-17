import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the CrudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html',
})
export class CrudPage {

  error: any = null;
  data: any = [];

  title: any;
  actions: any;
  resource: any;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private tools: Tools,
    private users: Users,
    private events: Events,
    public navParams: NavParams) {
    this.actions = this.navParams.data.actions || {};
    this.title = this.navParams.data.title;
    this.resource = this.navParams.data.resource;

    this.events.subscribe("reloaddata", () => {
      this.loadData();
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CrudPage');
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  loadData() {
    this.users.GetContactsOrChannels(this.resource)
      .then(data => {
        this.data = data['data'];
        this.error = this.data.length === 0 ? `暂无${this.title}数据` : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

  newItem() {
    this.navCtrl.push("CrudFormPage", { title: "新建" + this.title, resource: this.resource });
  }

  editItem(item) {
    this.navCtrl.push("CrudFormPage", { title: "编辑" + this.title, item: item, resource: this.resource });
  }

  deleteItem(item) {
    this.alertCtrl.create({
      title: "删除提示",
      subTitle: "您确定要删除吗？",
      buttons: [
        {
          role: "Cancel",
          text: "取消"
        },
        {
          text: "确定",
          handler: () => {
            this.users.DeleteContactOrChannel(this.resource, item.id)
              .then(data => {
                this.tools.showToast("删除成功！");
                this.loadData();
              })
              .catch(error => {
                this.tools.showToast(error.message || "服务器超时，请重试");
              });
          }
        }
      ]
    }).present();

  }

}
