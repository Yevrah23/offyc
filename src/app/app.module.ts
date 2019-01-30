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
import { UploadService } from './services/upload.service' 
import { AuthGuard } from './auth.guard';

// modals component
import { SubmitProposalComponent } from './modal/submit-proposal/submit-proposal.component';
import { ViewPorposalComponent } from './modal/view-porposal/view-porposal.component';
import { FileDetailsComponent } from './modal/file-details/file-details.component';
import { WarningDownloadComponent } from './modal/warning-download/warning-download.component';
import { GenerateReportComponent } from './modal/generate-report/generate-report.component';
import { SuccessComponent } from './modal/success/success.component';
import { ReportTemplateComponent } from './modal/report-template/report-template.component';
import { CommentComponent } from './modal/comment/comment.component';

// Cookies ni jaz
import { CookieService } from 'ngx-cookie-service';
// spinner
import { DataSpinnerComponent } from './loading/data-spinner/data-spinner.component';






@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    routingComponents,
    LoginRegLayoutComponent,
    SubmitProposalComponent,
    ViewPorposalComponent,
    FileDetailsComponent,
    WarningDownloadComponent,
    SuccessComponent,
    DataSpinnerComponent,
    GenerateReportComponent,
    ReportTemplateComponent,
    CommentComponent,
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
  entryComponents: [
    SubmitProposalComponent,
    ViewPorposalComponent,
    FileDetailsComponent,
    WarningDownloadComponent,
    SuccessComponent,
    GenerateReportComponent,
    ReportTemplateComponent,
    CommentComponent
  ],
  providers: [
    UserServices,
    UploadService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
