import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.module';
import { LoginRegLayoutComponent } from './login-reg-layout/login-reg-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserServices } from './services/user_services';
import { AuthGuard } from "./auth.guard";




@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    routingComponents,
    LoginRegLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    UserServices,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
