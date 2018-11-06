import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const ARRAY_COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: ARRAY_COMPONENTS,
  exports: ARRAY_COMPONENTS,
  imports: [
    MDBBootstrapModulesPro.forRoot(),
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
