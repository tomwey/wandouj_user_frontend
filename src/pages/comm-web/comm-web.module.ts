import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommWebPage } from './comm-web';

@NgModule({
  declarations: [
    CommWebPage,
  ],
  imports: [
    IonicPageModule.forChild(CommWebPage),
  ],
})
export class CommWebPageModule {}
