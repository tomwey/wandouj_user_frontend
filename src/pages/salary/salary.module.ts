import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryPage } from './salary';
import { ComponentsModule } from '../../components/components.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    SalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryPage),
    ComponentsModule,
    VirtualScrollerModule
  ],
})
export class SalaryPageModule { }
