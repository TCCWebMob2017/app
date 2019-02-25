import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { DoencaDTO } from '../models/doenca';

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

   public doencas: any;

  constructor(public navCtrl: NavController,
              private storage: StorageService) { }

  ngOnInit() {

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }

    this.doencas = [
      {
      id: "91e5ab56-9855-42f1-b34d-5eee2eaadea3",
      cid: "L02AE02",
      nome: "abatacepte",
      descricao: "abatacepte"
      },
      {
      id: "f5658665-bb86-4a2c-bb84-e615000a2eed",
      cid: "B01AC13",
      nome: "abciximabe",
      descricao: "solução injetável"
      },
      {
      id: "b83f9008-ef9c-4a44-b2ef-9afe3394a988",
      codigoATC: "H02AB01",
      nome: "acetato de betametasona + fosfato dissódico de betametasona",
      descricao: "suspensão injetável"
      }
    ]
      console.log(this.doencas);

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
    this.navCtrl.navigateForward('pessoal-medicamentos');
  }

}
