import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryPage } from './salary';

@NgModule({
  declarations: [
    SalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryPage),
  ],
})
export class SalaryPageModule {}
