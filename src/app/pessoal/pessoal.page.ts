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
          prontuario        : any;
          usuario           : UsuarioDTO;
  public  usuarioCarregado  : boolean;
  
  constructor(public  navCtrl         : NavController,
              public  pessoalService  : PessoalService,
              public  usuarioService  : UsuarioService,
              private storage         : StorageService,
              public  toastController : ToastController,
              public  alertController : AlertController) { }

  ngOnInit() { 
    //this.lerUsuarioDados();
  }

  ionViewWillEnter() {
    this.obterParametrosRecebidos();
    this.lerUsuarioDados();
  }

  obterParametrosRecebidos() {
    let _parametros = this.storage.getLocalParametros();
    this.usuarioCarregado = _parametros['usuarioCarregado'];
  }

  lerUsuarioDados() {
    let _localUser = this.storage.getLocalUser();
    if(_localUser && _localUser.email) {
      this.usuario = this.storage.getLocalUsuarioDados();
      if (this.usuario == null) {
        this.navCtrl.navigateRoot('/login');
      }
      else {
        if(this.usuario['perfilPessoal'] == null) {
          this.presentToast();
          this.navCtrl.navigateRoot('/home');
        }
      }
    }
    else { 
      this.navCtrl.navigateRoot('/login');
    }
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'O usuário não possui Perfil Pessoal.',
      duration: 2000
    });
    toast.present();
  }


  getImageIfExist() {
    this.pessoalService.getImageFromBucket(this.prontuario.pessoal.id)
    .subscribe(Response => {
      this.prontuario.pessoal.imageUrl = "";
    },
    error => {});
    //https://api-qlife.herokuapp.com/api/v1/pessoal/000/avatar
  }

  addPerfilPessoal() {
    this.storage.setLocalParametros('modoCRUD', 'C');
    this.storage.setLocalParametros('somenteLeitura', false);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', true);
    this.navCtrl.navigateForward(['pessoal-base']); 
  }

  exibirPessoalBase() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);    
    this.navCtrl.navigateForward(['pessoal-base']); 
  }
  
  modificarPessoalBase() { 
    this.storage.setLocalParametros('modoCRUD', 'U');
    this.storage.setLocalParametros('somenteLeitura', false);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', true);
    this.navCtrl.navigateForward(['pessoal-base']);
  }
  
  exibirPessoalMedicamentos() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    this.navCtrl.navigateForward(['pessoal-medicamentos']);
  }

  exibirPessoalDoencas() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    this.navCtrl.navigateForward(['pessoal-doencas']);
  }

  exibirPessoalAlergias() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    this.navCtrl.navigateForward(['pessoal-alergias']); 
  }

  exibirPessoalDrogas() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    this.navCtrl.navigateForward(['pessoal-drogas']); 
  }

  exibirPessoalCirurgias() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    this.navCtrl.navigateForward(['pessoal-cirurgias']); 
  }

  exibirPessoalDependentes() {
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    //this.navCtrl.navigateForward(['pessoal-dependentes']); 
  }

  exibirPessoalPermissoes() { 
    this.storage.setLocalParametros('modoCRUD', 'R');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', false);
    //this.navCtrl.navigateForward(['pessoal-permissoes']); 
  }

  exibirFichaMedica() { 
    this.navCtrl.navigateForward(['ficha-medica'])
  }

}