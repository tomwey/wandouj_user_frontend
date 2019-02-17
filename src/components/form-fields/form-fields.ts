import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Users } from '../../provider/Users';
import { ApiService } from '../../provider/api-service';

/**
 * Generated class for the FormFieldsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-fields',
  templateUrl: 'form-fields.html'
})
export class FormFieldsComponent {

  @Input() controls: any = [];
  @Output() onControlSelect: EventEmitter<any> = new EventEmitter();

  constructor(private api: ApiService) {
    // console.log(this.controls);
  }

  ngOnInit() {
    this.controls.forEach(control => {
      if (control.type == 20) {
        // 绑定验证码控件，到手机输入控件
        control.mobile_control = this._getControlsFor(control);
      }
    });
  }

  placeholderFromControl(control) {
    const prefix = (control.type == 2 || control.type == 3) ? "输入" : "设置"
    return control.placeholder || `${prefix}${control.name}`;
  }

  selectValueFromItem(item): string {
    // console.log(item);
    if (!item.value) {
      return `请选择 (${item.type == 6 ? '可多选' : '单选'})`;
    } else {
      let val = item.value.label || item.value;
      // console.log(val);
      if (!val) return null;

      return val.split('|')[0];
    }
  }

  removeMe(ev: Event, item, it) {
    // console.log(123);
    ev.stopPropagation();
    const arr = item.value || [];
    const index = arr.indexOf(it);
    if (index !== -1) {
      arr.splice(index, 1);
      item.value = arr;
    }
  }

  private _getControlsFor(item) {
    let mobileControl = null;
    for (let i = 0; i < this.controls.length; i++) {
      let control = this.controls[i];
      if (control.id == item.mobile_field) {
        mobileControl = control;
        break;
      }
    }
    return mobileControl;
  }

  getCode(item) {

    let mobileControl = item.mobile_control;

    if (!mobileControl) {
      console.log("验证码关联手机控件未配置正确");
      return;
    };

    if (!mobileControl.value) {
      alert("手机号不能为空");
      return;
    }

    if (item.timerStarting) return;

    this.api.POST("auth_codes", { mobile: mobileControl.value, code_type: item.code_type || 1 })
      .then(data => {
        this.startTimer(item);
      })
      .catch(error => {
        alert(error.message || "服务器超时，请重试");
      });
  }

  startTimer(item) {
    item.timerStarting = true;
    item.curr_seconds = item.seconds;
    item.countdown_text = `${item.seconds}秒后重新获取`;

    if (!item.countdown_timer) {
      item.countdown_timer = setInterval(() => {
        item.curr_seconds -= 1;
        if (item.curr_seconds <= 0) {
          clearInterval(item.countdown_timer);
          item.countdown_timer = null;
          item.timerStarting = false;
          item.curr_seconds = item.seconds;
          item.countdown_text = item.get_code_text;
        } else {
          item.countdown_text = `${item.curr_seconds}秒后重新获取`;
        }
      }, 1000);
    }
  }

  selectItem(item) {
    this.onControlSelect.emit(item);
  }
}
