import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { STORAGE_KEY } from 'src/config/storagekeys.config';

@Component({
  selector: 'app-usuario-foto',
  templateUrl: './usuario-foto.page.html',
  styleUrls: ['./usuario-foto.page.scss'],
})
export class UsuarioFotoPage implements OnInit {
  public avatarBlank: string;
  public modoCRUD: string;
  public somenteLeitura: boolean;

  constructor(
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.avatarBlank = STORAGE_KEY.avatarBlank;
    this.modoCRUD = 'R';
    this.somenteLeitura = true;
  }

  setRegistroModoEditar() {
    this.modoCRUD = 'U';
    this.somenteLeitura = false;
    this.menuEditarFoto();
  }

  async menuEditarFoto() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Apagar foto',
        role: 'destructive',
        handler: () => {
          // this.obterListaItens();
        }
      }, {
        text: 'Tirar foto',
        handler: () => {
          // this.obterListaItens();
        }
      }, {
        text: 'Escolher foto',
        handler: () => {
          // this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }
}