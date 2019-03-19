import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgModel } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  usernameModel : NgModel;
  public  usuario         : any;
  public  modoCRUD        : string;
  public  somenteLeitura  : boolean;

  constructor(public  navCtrl         : NavController,
              public  auth            : AuthService,
              //private readonly authService: AuthService,
              //private readonly loadingCtrl: LoadingController,
              //private readonly toastCtrl: ToastController,
              //public formBuilder: FormBuilder,
              public  usuarioService  : UsuarioService,
              private storage         : StorageService,
              public  alertCtrl       : AlertController
              ) { 

  }

  ngOnInit() {
    this.lerUsuarioDados();
    let _parametros     = this.storage.getLocalParametros();
    this.modoCRUD       = _parametros['modoCRUD'];
    this.somenteLeitura = _parametros['somenteLeitura'];
    console.log(this.modoCRUD);
  }

  lerUsuarioDados() {
    this.usuario = this.storage.getLocalUsuarioDados();
    console.log(this.usuario);
  };


  async signup(value: any) {
    this.auth.signup(value)
    .subscribe(Response => {
      //this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('login');
      //console.log(Response);
    },
    error => {
      console.log(error);
    });
  } 

  gravarDados(value : any) {
    
    console.log(value);
    console.log(this.usuario);

    if (this.usuario['perfilPessoal'] == null) {
      let _perfilPessoal : any = { "id": null };
      this.usuario['perfilPessoal'] = _perfilPessoal;
    }
    this.usuario['nome']           = value.nome,
    this.usuario['tefefone']       = value.telefone,
    this.usuario['rg']             = value.rg,
    this.usuario['cpf']            = value.cpf

    //this.storage.setLocalUsuarioDados(this.usuario);
    
    
    //if (this.usuarioService.enviarDadosDoStorageParaApi()) {
    //  //this.gravaDadosPresentToast();
    //}
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }  

}
