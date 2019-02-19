import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
@NgModule({
	declarations: [FormFieldsComponent,
    JobItemComponent],
	imports: [IonicPageModule.forChild([FormFieldsComponent])],
	exports: [FormFieldsComponent,
    JobItemComponent]
})
export class ComponentsModule { }
