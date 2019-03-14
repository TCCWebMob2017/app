import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PessoalDrogasAddPage } from './pessoal-drogas-add.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDrogasAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalDrogasAddPage]
})
export class PessoalDrogasAddPageModule {}
