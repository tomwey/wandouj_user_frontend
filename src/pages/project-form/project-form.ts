import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the ProjectFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-form',
  templateUrl: 'project-form.html',
})
export class ProjectFormPage {

  controls: any = [
    {
      id: 'name',
      name: "项目名字",
      type: 2,
      required: true,
    },
    {
      id: 'contact_name',
      name: '甲方对接人',
      type: 2
    },
    {
      id: 'contact_mobile',
      name: '甲方对接人电话',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'marketer_name',
      name: '我方市场对接人',
      type: 2,
      required: true,
    },
    {
      id: 'marketer_mobile',
      name: '我方市场对接人电话',
      type: 2,
      subtype: 'tel',
      required: true
    },
    {
      id: 'memo',
      name: '备注',
      type: 3
    }
  ];

  project: any = null;
  title: any;
  constructor(public navCtrl: NavController,
    private tools: Tools,
    private users: Users,
    private events: Events,
    public navParams: NavParams) {
    this.title = this.navParams.data.title;
    if (this.navParams.data.project) {
      this.project = this.navParams.data.project;
      this.controls.forEach(control => {
        control.value = this.project[control.id];
        // if (control.id === "mobile") {
        //   control.disabled = true;
        // }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectFormPage');
  }

  save() {
    let proj_id = null;
    if (this.project) {
      proj_id = this.project.id;
    }

    let params = { id: proj_id };

    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      params[control.id] = control.value;
    }

    this.users.SaveProjects(params)
      .then(data => {
        this.tools.showToast("保存成功！");
        this.events.publish("reloaddata");
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器超时，请重试');
      });

    // console.log(this.permissionResources);
  }
}

