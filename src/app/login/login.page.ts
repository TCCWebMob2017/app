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

  public userOnLine: any;

  constructor(
    public  navCtrl         : NavController, 
    public  menu            : MenuController,
    public  auth            : AuthService,
    public  usuarioService  : UsuarioService,
    private storage         : StorageService) { }


  ngOnInit() {
    this.storage.clearLocalUser();
    this.storage.clearLocalUsuarioDados();
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
        this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
        //this.usuarioService.buscarDadosUsuarioNaApiParaStorage();
        this.navCtrl.navigateRoot('pessoal');
      },
      error => {
        console.log(error);
      }
    )
  };

  signup() { 
    this.navCtrl.navigateForward('signup');
  };

  sobre() {
    this.navCtrl.navigateForward('sobre');
  }

}
