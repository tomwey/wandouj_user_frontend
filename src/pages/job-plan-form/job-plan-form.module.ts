import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobPlanFormPage } from './job-plan-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    JobPlanFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JobPlanFormPage),
    ComponentsModule,
  ],
})
export class JobPlanFormPageModule { }
