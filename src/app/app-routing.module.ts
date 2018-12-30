import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Logins
import { LoginComponent } from './login/login.component';
import { LoginRegLayoutComponent } from './login-reg-layout/login-reg-layout.component';
import { RegisterComponent } from './register/register.component';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { RecordsComponent } from './pages/records/records.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full'},
  { path : '', component: LoginRegLayoutComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  { path : 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: HomeComponent},
    {path: 'records', component: RecordsComponent}
  ]},
  {path : '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// tslint:disable-next-line:max-line-length
export const routingComponents = [LoginComponent, RegisterComponent, AdminComponent, HomeComponent, RecordsComponent, PageNotFoundComponent];
