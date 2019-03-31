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
    public usuarioService: UsuarioService,
    private storage: StorageService,
    public toastController: ToastController,
    public alertController: AlertController
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

  async excluirContaUsuario() {
    const alert = await this.alertController.create({
      header: 'Excluir conta',
      message: 'A conta do usuário será excuída.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            let _idUsuario = this.usuario['id'];

            if (_idUsuario != null) {

              this.usuarioService.excluirUsuarioConta(_idUsuario)
                .subscribe(Response => {
                  this.storage.clearPerfilPessoal();
                  // this.deletePresentToast();
                  this.irParaTelaLogin();
                },
                  error => {
                    //console.log(error);
                  });
            }

            //console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  alterarSenha() {
    this.storage.setLocalParametros('paginaAnterior', '/signup');
    this.navCtrl.navigateForward(['/alterar-senha']);
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('/home');
  }

  irParaTelaLogin() {
    this.navCtrl.navigateBack('/login');
  }

}
