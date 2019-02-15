import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PessoalMedicamentosPage } from './pessoal-medicamentos.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalMedicamentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalMedicamentosPage]
})
export class PessoalMedicamentosPageModule {}
