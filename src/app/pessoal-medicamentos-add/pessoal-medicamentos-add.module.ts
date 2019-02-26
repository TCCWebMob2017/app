import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalMedicamentosAddPage } from './pessoal-medicamentos-add.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalMedicamentosAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalMedicamentosAddPage]
})
export class PessoalMedicamentosAddPageModule {}
