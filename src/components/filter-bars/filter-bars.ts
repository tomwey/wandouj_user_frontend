import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the FilterBarsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-bars',
  templateUrl: 'filter-bars.html'
})
export class FilterBarsComponent {

  @Input() filterItems: any = [];
  @Output() onSelectFilterItem: EventEmitter<any> = new EventEmitter();
  @ViewChild('datePicker') datePicker;
  constructor(private modalCtrl: ModalController) {
    // console.log('Hello FilterBarsComponent Component');
    // this.text = 'Hello World';
  }

  selectFilter(item) {
    if (item.isPicker) {
      this.datePicker.open();
    } else {
      // this.modalCtrl.create('CommSelectPage').present();
      // this.onSelectFilterItem.emit(item);
      item.selectFunc(item, (result) => {
        let modal = this.modalCtrl.create('FilterSelectPage', { title: item.name, data: result });
        modal.onDidDismiss(data => {
          if (data) {
            let value = item.value || {}

            if (value.value != data.value) {
              item.value = data;
              this.onSelectFilterItem.emit(item);
            }
          }
        });
        modal.present();
      });
    }
  }

  selectedDate(item) {
    // console.log(item);
    this.onSelectFilterItem.emit(item);
  }

  filterItemLabel(item) {
    if (item.isPicker) {
      if (item.value) {
        return Utils.dateFormat(new Date()) == item.value ? "今天" : item.value;
      } else {
        return item.name;
      }
    } else {
      return (item.value || {}).label || item.name;
    }
  }

}
