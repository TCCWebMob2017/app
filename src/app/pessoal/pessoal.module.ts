import { MenuUsuarioComponent } from './../component/menu-usuario/menu-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PessoalPage } from './pessoal.page';

const routes: Routes = [
  {
    path: '',
    component: PessoalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoalPage, MenuUsuarioComponent],
  entryComponents: [MenuUsuarioComponent]
})
export class PessoalPageModule {}
