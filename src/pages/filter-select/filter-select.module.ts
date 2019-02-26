import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterSelectPage } from './filter-select';

@NgModule({
  declarations: [
    FilterSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterSelectPage),
  ],
})
export class FilterSelectPageModule {}
