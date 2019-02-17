import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFormPage } from './account-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AccountFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountFormPage),
    ComponentsModule
  ],
})
export class AccountFormPageModule { }
