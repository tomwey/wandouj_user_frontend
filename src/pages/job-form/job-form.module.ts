import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobFormPage } from './job-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    JobFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JobFormPage),
    ComponentsModule
  ],
})
export class JobFormPageModule { }
