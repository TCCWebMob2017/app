import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-doencas',
  templateUrl: './pessoal-doencas.page.html',
  styleUrls: ['./pessoal-doencas.page.scss'],
})
export class PessoalDoencasPage implements OnInit {

  constructor(public navCtrl: NavController,
              private storage: StorageService) { }

  ngOnInit() {
  }


  irParaTelaAnterior() {
    //this.navCtrl.navigateBack('pessoal');
    //this.navCtrl.navigateForward('pessoal-base');
    this.navCtrl.navigateBack('pessoal-base');
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward('ficha-medica');
  }

}
