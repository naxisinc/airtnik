import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { MainTemplate } from './main/main.template';
import { CommonModule } from '@angular/common';

const ARRAY_COMPONENTS = [MainTemplate];

@NgModule({
  declarations: ARRAY_COMPONENTS,
  exports: ARRAY_COMPONENTS,
  imports: [RouterModule, ComponentsModule, CommonModule, FormsModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TemplatesModule {}
