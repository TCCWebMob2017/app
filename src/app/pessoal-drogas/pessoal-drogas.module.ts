import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalDrogasPage } from './pessoal-drogas.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDrogasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalDrogasPage]
})
export class PessoalDrogasPageModule {}
