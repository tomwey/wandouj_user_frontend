import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobPlanCreateHomePage } from './job-plan-create-home';

@NgModule({
  declarations: [
    JobPlanCreateHomePage,
  ],
  imports: [
    IonicPageModule.forChild(JobPlanCreateHomePage),
  ],
})
export class JobPlanCreateHomePageModule {}
