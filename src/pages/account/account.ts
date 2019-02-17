import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  error: any = null;
  accounts: any = [];
  actions: any;
  constructor(
    public navCtrl: NavController,
    private users: Users,
    private events: Events,
    private tools: Tools,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.events.subscribe("reloaddata", () => {
      this.loadAccounts();
    });

    this.actions = this.navParams.data.actions || {};
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AccountPage');
    setTimeout(() => {
      this.loadAccounts();
    }, 200);
  }

  loadAccounts() {
    this.users.GetAccounts()
      .then(data => {
        this.accounts = data['data'];
        this.error = this.accounts.length === 0 ? "暂无账号" : null;
        console.log(this.accounts);
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

  newItem() {
    this.navCtrl.push("AccountFormPage", { title: "新建账号" });
  }

  editItem(item) {
    this.navCtrl.push("AccountFormPage", { title: "编辑账号", account: item });
  }

  deleteItem(item) {
    this.alertCtrl.create({
      title: "删除提示",
      subTitle: "您确定要删除该账号吗？",
      buttons: [
        {
          role: "Cancel",
          text: "取消"
        },
        {
          text: "确定",
          handler: () => {
            this.users.DeleteAccount(item.id)
              .then(data => {
                this.tools.showToast("删除成功！");
                this.loadAccounts();
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
