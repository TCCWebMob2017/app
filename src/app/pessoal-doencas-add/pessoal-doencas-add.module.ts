import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalDoencasAddPage } from './pessoal-doencas-add.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDoencasAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalDoencasAddPage]
})
export class PessoalDoencasAddPageModule {}
