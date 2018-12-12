import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LoginRegLayoutComponent } from './login-reg-layout/login-reg-layout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full'},
  { path : '', component: LoginRegLayoutComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  { path : 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: HomeComponent}
  ]},
  {path : '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, AdminComponent, HomeComponent, PageNotFoundComponent];
