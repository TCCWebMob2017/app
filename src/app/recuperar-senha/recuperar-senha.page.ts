import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  solicitarNovaSenha(value: any) {
    this.auth.forgotPassword(value)
      .subscribe(Response => {
        this.presentToast('Senha enviada: ' + value.email);
        this.navCtrl.navigateRoot('/login');
      },
        error => {
          let _msg = JSON.parse(error['error']);
          this.presentToast(_msg['msg']);
        });
  }

  async presentToast(p_message: string) {
    const toast = await this.toastController.create({
      message: p_message,
      position: 'top',
      duration: 2500
    });
    toast.present();
  }

}
