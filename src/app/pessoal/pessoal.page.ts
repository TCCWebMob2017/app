import { UsuarioService } from './../services/usuario.service';
import { UsuarioDTO } from './../models/usuario';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  prontuario  : any;
  usuario     : UsuarioDTO;
  
  constructor(public  navCtrl         : NavController,
              public  pessoalService  : PessoalService,
              public  usuarioService  : UsuarioService,
              private storage         : StorageService,
              public  toastController : ToastController,
              public  alertController : AlertController) { }

  ngOnInit() { 
    console.log('PessoalPage | ngOnInit');
    this.lerUsuarioDados();
  }

  ionViewWillEnter() {
    console.log('PessoalPage | Will Enter');
    this.lerUsuarioDados();
  }  

  lerUsuarioDados() {
    let _localUser = this.storage.getLocalUser();
    console.log('PessoalPage | lerUsuarioDados');
    if(_localUser && _localUser.email) {
      this.usuario = this.storage.getLocalUsuarioDados();
      if (this.usuario == null) {
        this.usuarioService.getLoggedInUser()
        .subscribe(Response => {
          this.usuario = Response;
          this.storage.setLocalUsuarioDados(this.usuario);
        },
        error => { 
          if (error.status == 403) { this.navCtrl.navigateRoot('login'); }
        });
      }
    }
    else { this.navCtrl.navigateRoot('login'); }
  };


  getImageIfExist() {
    this.pessoalService.getImageFromBucket(this.prontuario.pessoal.id)
    .subscribe(Response => {
      this.prontuario.pessoal.imageUrl = "";
    },
    error => {});
    //https://api-qlife.herokuapp.com/api/v1/pessoal/000/avatar
  }

  addPerfilPessoal()          { this.navCtrl.navigateForward(['pessoal-base',         {modoCRUD: 'C'}]); }
  exibirPessoalBase()         { this.navCtrl.navigateForward(['pessoal-base',         {modoCRUD: 'R'}]); }
  modificarPessoalBase()      { this.navCtrl.navigateForward(['pessoal-base',         {modoCRUD: 'U'}]); }
  exibirPessoalMedicamentos() { this.navCtrl.navigateForward(['pessoal-medicamentos', {modoCRUD: 'R'}]); }
  exibirPessoalDoencas()      { this.navCtrl.navigateForward(['pessoal-doencas',      {modoCRUD: 'R'}]); }
  exibirPessoalAlergias()     { this.navCtrl.navigateForward(['pessoal-alergias',     {modoCRUD: 'R'}]); }
  exibirPessoalDrogas()       { this.navCtrl.navigateForward(['pessoal-drogas',       {modoCRUD: 'R'}]); }
  exibirPessoalCirurgias()    { this.navCtrl.navigateForward(['pessoal-cirurgias',    {modoCRUD: 'R'}]); }
  exibirPessoalDependentes()  { this.navCtrl.navigateForward(['pessoal-dependentes',  {modoCRUD: 'R'}]); }
  exibirPessoalPermissoes()   { this.navCtrl.navigateForward(['pessoal-permissoes',   {modoCRUD: 'R'}]); }
  exibirFichaMedica()         { this.navCtrl.navigateForward(['ficha-medica'])}

}