import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ContactComponent } from './core/contact/contact.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './authguard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate :[AuthGuard] },
  { path: 'contact', component: ContactComponent , canActivate :[AuthGuard] },
  { path: 'login', component: LoginComponent , canActivate :[AuthGuard] },
  { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule) , canActivate :[AuthGuard] },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) , canActivate :[AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
