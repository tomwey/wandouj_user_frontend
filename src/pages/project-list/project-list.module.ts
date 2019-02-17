import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectListPage } from './project-list';

@NgModule({
  declarations: [
    ProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectListPage),
  ],
})
export class ProjectListPageModule {}
