import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectFormPage } from './project-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProjectFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectFormPage),
    ComponentsModule,
  ],
})
export class ProjectFormPageModule { }
