import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [FormFieldsComponent],
	imports: [IonicPageModule.forChild([FormFieldsComponent])],
	exports: [FormFieldsComponent]
})
export class ComponentsModule { }
