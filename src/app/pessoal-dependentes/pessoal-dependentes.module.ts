import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalDependentesPage } from './pessoal-dependentes.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDependentesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalDependentesPage]
})
export class PessoalDependentesPageModule {}
