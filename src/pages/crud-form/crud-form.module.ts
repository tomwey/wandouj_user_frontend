import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrudFormPage } from './crud-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CrudFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CrudFormPage),
    ComponentsModule
  ],
})
export class CrudFormPageModule { }
