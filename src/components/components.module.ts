import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { FilterBarsComponent } from './filter-bars/filter-bars';

@NgModule({
	declarations: [FormFieldsComponent,
		FilterBarsComponent,
		JobItemComponent],
	imports: [IonicPageModule.forChild([FormFieldsComponent])],
	exports: [FormFieldsComponent,
		FilterBarsComponent,
		JobItemComponent]
})
export class ComponentsModule { }
