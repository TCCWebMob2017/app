import { AlertController } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { StorageService } from '../services/storage.service';
import { PessoalService } from '../services/pessoal.service';
import { STORAGE_KEY } from 'src/config/storagekeys.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: any;
  public usuarioCarregado: boolean;
  public avatarBlank: string;
  constructor(public navCtrl: NavController,
    public pessoalService: PessoalService,
    public usuarioService: UsuarioService,
    private storage: StorageService,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.avatarBlank = STORAGE_KEY.avatarBlank;
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
    if (_localUser && _localUser.email) {
      this.usuario = this.storage.getLocalUsuarioDados();
      if (this.usuario == null) {
        this.navCtrl.navigateRoot('/login');
      }
      else {
        this.usuarioCarregado = true;
      }
    }
    else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  addPerfilPessoal() {
    this.storage.setLocalParametros('modoCRUD', 'C');
    this.storage.setLocalParametros('somenteLeitura', false);
    this.storage.setLocalParametros('exibirBarraDeNavegacao', true);
    this.navCtrl.navigateForward(['pessoal-base']);
  }

  editarUsuarioDados() {
    this.storage.setLocalParametros('modoCRUD', 'U');
    this.storage.setLocalParametros('somenteLeitura', true);
    this.navCtrl.navigateForward(['signup']);
  }
}
