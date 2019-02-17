import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobPlanListPage } from './job-plan-list';

@NgModule({
  declarations: [
    JobPlanListPage,
  ],
  imports: [
    IonicPageModule.forChild(JobPlanListPage),
  ],
})
export class JobPlanListPageModule {}
