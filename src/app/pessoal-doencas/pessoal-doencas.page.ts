import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-doencas',
  templateUrl: './pessoal-doencas.page.html',
  styleUrls: ['./pessoal-doencas.page.scss'],
})
export class PessoalDoencasPage implements OnInit {

  public items: Array<{ 
    title: string; 
    note: string;
   }> = [];

  constructor(public navCtrl: NavController,
              private storage: StorageService) { }

  ngOnInit() {

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }

  }

  addDoenca() {
    this.navCtrl.navigateForward('pessoal-doenca-det');
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
