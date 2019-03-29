import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds : CredenciaisDTO = {
    email: "",
    password: ""
  };

  public  userOnLine        : any;
  public  usuario           : any;
  public  usuarioCarregado  : boolean;

  constructor(
    public  navCtrl         : NavController, 
    public  menu            : MenuController,
    public  auth            : AuthService,
    public  usuarioService  : UsuarioService,
    private storage         : StorageService) { }


  ngOnInit() {
    this.storage.limparUsuarioCredenciais();
    this.storage.limparUsuarioDados();
    this.storage.limparUsuarioPerfilPessoal();
    this.storage.setLocalParametros("usuarioCarregado", false);
  }

  ionViewWillEnter(){
    this.menu.enable(false);  //this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(Response => {
        console.log(Response);
        this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
        this.lerUsuarioDados();
        //this.navCtrl.navigateRoot('/home');
        //this.navCtrl.navigateRoot('/pessoal');
      },
      error => {
        console.log(error);
      }
    )
  };

  lerUsuarioDados() {
    this.usuarioService.getLoggedInUser()
    .subscribe(Response => {
      this.usuarioCarregado = true;
      this.usuario = Response;
      this.storage.setLocalUsuarioDados(this.usuario);
      this.storage.setLocalParametros("usuarioCarregado", this.usuarioCarregado);
      if (this.usuario['perfilPessoal'] == null) {
        this.navCtrl.navigateRoot('/home');
      }
      else {
        this.navCtrl.navigateRoot('/pessoal');
      }     
    },
    error => { 
      if (error.status == 403) {
        this.navCtrl.navigateRoot('login');
      }
    });
  };
  
  signup() { 
    this.storage.setLocalParametros('modoCRUD', 'C');
    this.storage.setLocalParametros('somenteLeitura', false);
    this.navCtrl.navigateForward('signup');
  };

  sobre() {
    this.navCtrl.navigateForward('sobre');
  }

}
