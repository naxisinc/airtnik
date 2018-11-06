import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
  }
];

export function tokenGetter() {
  return localStorage.getItem('X-Auth');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
