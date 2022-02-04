import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './components/form-element/form-element.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormElementComponent, FormComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    FormElementComponent, FormComponent
  ]
})
export class FormsModuleModule { }
