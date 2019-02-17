import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobPlanBatchFormPage } from './job-plan-batch-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    JobPlanBatchFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JobPlanBatchFormPage),
    ComponentsModule
  ],
})
export class JobPlanBatchFormPageModule { }
