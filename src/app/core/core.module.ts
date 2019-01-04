import { AppRoutingModule } from './../app.routing.module';
import { HomeComponent } from './core/../home/home.component';
import { HeaderComponent } from './core/../header/header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LogginInterceptor } from '../shared/loggin.interceptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule, AppRoutingModule, RouterModule],
  exports: [AppRoutingModule, HeaderComponent, RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogginInterceptor, multi: true }
  ]
})
export class CoreModule {}
