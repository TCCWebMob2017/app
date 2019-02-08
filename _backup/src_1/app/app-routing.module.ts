import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'pessoal', loadChildren: './pessoal/pessoal.module#PessoalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'pessoal-dependentes', loadChildren: './pessoal-dependentes/pessoal-dependentes.module#PessoalDependentesPageModule' },
  { path: 'pessoal-doencas', loadChildren: './pessoal-doencas/pessoal-doencas.module#PessoalDoencasPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
