import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'pessoal', loadChildren: './pessoal/pessoal.module#PessoalPageModule' },
  { path: 'pessoal-todos', loadChildren: './pessoal-todos/pessoal-todos.module#PessoalTodosPageModule' },
  { path: 'ficha-medica', loadChildren: './ficha-medica/ficha-medica.module#FichaMedicaPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'pessoal-medicamentos', loadChildren: './pessoal-medicamentos/pessoal-medicamentos.module#PessoalMedicamentosPageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'pessoal-base', loadChildren: './pessoal-base/pessoal-base.module#PessoalBasePageModule' },
  { path: 'pessoal-doencas', loadChildren: './pessoal-doencas/pessoal-doencas.module#PessoalDoencasPageModule' },
  { path: 'pessoal-doenca-det', loadChildren: './pessoal-doenca-det/pessoal-doenca-det.module#PessoalDoencaDetPageModule' },
  { path: 'pessoal-medicamentos-add', loadChildren: './pessoal-medicamentos-add/pessoal-medicamentos-add.module#PessoalMedicamentosAddPageModule' },
  { path: 'pessoal-alergias', loadChildren: './pessoal-alergias/pessoal-alergias.module#PessoalAlergiasPageModule' },  { path: 'pessoal-doencas-add', loadChildren: './pessoal-doencas-add/pessoal-doencas-add.module#PessoalDoencasAddPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
