import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalDoencasPage } from './pessoal-doencas.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDoencasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalDoencasPage]
})
export class PessoalDoencasPageModule {}
