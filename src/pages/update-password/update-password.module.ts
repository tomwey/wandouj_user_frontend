import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePasswordPage } from './update-password';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UpdatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePasswordPage),
    ComponentsModule
  ],
})
export class UpdatePasswordPageModule { }
