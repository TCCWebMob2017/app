import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl : NavController) {}

  pessoalAvatar: string = "https://bioup.herokuapp.com/api/v1/pessoal/badd5647-abd4-44d2-8462-b68e0fd02165/avatar";

  openPessoalPage() {

    this.navCtrl.navigateForward('pessoal');

    //alert('openPessoalPage');
  }
}
