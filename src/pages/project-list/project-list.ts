import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the ProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  error: any = null;
  projects: any = [];

  actions: any;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private tools: Tools,
    private users: Users,
    private events: Events,
    public navParams: NavParams) {
    this.events.subscribe("reloaddata", () => {
      this.loadProjects();
    })

    this.actions = this.navParams.data.actions || {};
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProjectListPage');
    setTimeout(() => {
      this.loadProjects();
    }, 200);
  }

  loadProjects() {
    this.users.GetProjects()
      .then(data => {
        this.projects = data['data'];
        this.error = this.projects.length === 0 ? '暂无兼职项目' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

  newItem() {
    this.navCtrl.push("ProjectFormPage", { title: "新建兼职项目" });
  }

  editItem(item) {
    this.navCtrl.push("ProjectFormPage", { title: "编辑兼职项目", project: item });
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
            this.users.DeleteProject(item.id)
              .then(data => {
                this.tools.showToast("删除成功！");
                this.loadProjects();
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
