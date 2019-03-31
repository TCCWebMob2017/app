import { AlertController, ToastController } from '@ionic/angular';
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

  usernameModel: NgModel;
  public usuario: any;
  public modoCRUD: string;
  public somenteLeitura: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    //private readonly authService: AuthService,
    //private readonly loadingCtrl: LoadingController,
    //private readonly toastCtrl: ToastController,
    //public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    private storage: StorageService,
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) {

  }

  ngOnInit() {
    this.lerUsuarioDados();
    let _parametros = this.storage.getLocalParametros();
    this.modoCRUD = _parametros['modoCRUD'];
    this.somenteLeitura = _parametros['somenteLeitura'];
  }

  lerUsuarioDados() {
    this.usuario = this.storage.getLocalUsuarioDados();
    if (this.usuario != null) {
      this.usuario['password'] = "";
    }
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

  gravarDados(value: any) {

    if (this.usuario != null) {

      if (value.password == '') {
        alert('Informar a senha');
        return;
      }
      this.usuario['nome'] = value.nome;
      //this.usuario['password']  = value.password;
      this.usuario['tefefone'] = value.telefone;
      this.usuario['rg'] = value.rg;
      delete this.usuario['password'];
      delete this.usuario['tipos'];

      this.usuarioService.modificarUsuarioDados(this.usuario)
        .subscribe(Response => {
          this.usuario.password = "";
          this.storage.setLocalUsuarioDados(this.usuario);
          this.toastGravarSucesso();
          this.irParaTelaHome();
        },
          error => {
            alert(error);
          });
    }

  }

  async toastGravarSucesso() {
    const toast = await this.toastController.create({
      message: 'Dados gravados com sucesso !',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('/home');
  }

}
