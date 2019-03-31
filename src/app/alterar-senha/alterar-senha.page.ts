import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { StorageService } from '../services/storage.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  public usuario: any;
  public paginaAnterior: string;

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    private storage: StorageService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.lerUsuarioDados();
    let _parametros = this.storage.getLocalParametros();
    this.paginaAnterior = _parametros['paginaAnterior'];
  }

  lerUsuarioDados() {
    this.usuario = this.storage.getLocalUsuarioDados();
    if (this.usuario != null) {
      this.usuario['password'] = "";
    }
  };

  alterarSenha(value: any) {
    if (value.password != value.confirm) {
      this.alertSenhaNaoConfere();
    }
    else {
      this.usuario['password'] = value.password;
      this.gravarDados(this.usuario);
    }
  }

  gravarDados(value: any) {
    if (this.usuario != null) {
      delete this.usuario['tipos'];
      this.usuarioService.modificarUsuarioDados(this.usuario)
        .subscribe(Response => {
          this.usuario.password = "";
          this.storage.setLocalUsuarioDados(this.usuario);
          this.toastGravarSucesso();
          this.irParaTelaHome();
        },
          error => {
            this.toastGravarErro(error);
          });
    }
  }

  async alertSenhaNaoConfere() {
    const alert = await this.alertController.create({
      header: 'Senha inválida',
      // subHeader: 'Subtitle',
      message: "A 'senha' informada e sua 'confirmação' não são iguais.",
      buttons: ['OK']
    });
    await alert.present();
  }

  async toastGravarSucesso() {
    const toast = await this.toastController.create({
      message: 'Senha alterada com sucesso !',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async toastGravarErro(error: any) {
    const toast = await this.toastController.create({
      message: 'Senha alterada com sucesso !',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack(this.paginaAnterior);
  }
}
