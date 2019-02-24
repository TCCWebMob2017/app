import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PessoalDoencaDetPage } from './pessoal-doenca-det.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalDoencaDetPage
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
  declarations: [PessoalDoencaDetPage]
})
export class PessoalDoencaDetPageModule {}
