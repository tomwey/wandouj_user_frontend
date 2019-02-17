import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrudPage } from './crud';

@NgModule({
  declarations: [
    CrudPage,
  ],
  imports: [
    IonicPageModule.forChild(CrudPage),
  ],
})
export class CrudPageModule {}
