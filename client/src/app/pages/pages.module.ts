import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TemplatesModule } from '../templates/templates.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CapabilityService } from '../services/capability.service';
import { PagerService } from '../services/pager.service';
import { SendEmailService } from '../services/sendEmail.service';

import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
// import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { MainTemplate } from '../templates/main/main.template';
import { HomePage } from './home/home.page';
import { CapabilitiesPage } from './capabilities/capabilities.page';
import { LoginPage } from './login/login.page';
import { NotFoundPage } from './not-found/not-found.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { RecoverpassPage } from './recoverpass/recoverpass.page';
import { ChangepassPage } from './changepass/changepass.page';
import { AuthGuard } from '../guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: MainTemplate,
    children: [
      { path: 'home', component: HomePage },
      { path: 'radios', component: CapabilitiesPage },
      { path: 'accessories', component: CapabilitiesPage },
      { path: 'gables', component: CapabilitiesPage },
      { path: 'login', component: LoginPage },
      { path: 'recover-password', component: RecoverpassPage },
      {
        path: 'change-password',
        component: ChangepassPage,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: NotFoundPage }
    ]
  }
];

const ARRAY_COMPONENTS = [
  HomePage,
  CapabilitiesPage,
  LoginPage,
  RecoverpassPage,
  ChangepassPage,
  NotFoundPage,
  DashboardPage
];

@NgModule({
  declarations: ARRAY_COMPONENTS,
  imports: [
    RouterModule.forChild(appRoutes),
    TemplatesModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot()
  ],
  exports: [RouterModule, ARRAY_COMPONENTS],
  providers: [
    // MDBSpinningPreloader,
    SendEmailService,
    AuthService,
    CapabilityService,
    PagerService,
    AuthGuard
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {}
