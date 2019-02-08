import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { HomePage } from './home/home.page';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule'},
  {path: 'home', component: HomePage, canActivate: [AuthGuard]},
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  { path: 'pessoal', loadChildren: './pessoal/pessoal.module#PessoalPageModule' },
  //{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', component: LoginPage},
  //{ path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signup', component: SignupPage},
  //{ path: '**', redirectTo: '/home'},
  { path: 'pessoal-dependentes', loadChildren: './pessoal-dependentes/pessoal-dependentes.module#PessoalDependentesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
