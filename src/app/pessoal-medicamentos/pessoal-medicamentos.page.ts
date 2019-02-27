import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {

  public medicamentos: any;
  
  constructor(public navCtrl: NavController, 
              public pessoalService: PessoalService,
              private storage: StorageService) { }

  ngOnInit() {

    /*
    this.pessoalService.getMedicamentosAll()
    .subscribe(Response => {
        this.medicamentos = Response;
    },
    error => {
      console.log(error);
    });
    */

    console.log('ngOnInit ....');
  }

  obterListaMedicamentos() {
    let _localProfile = this.storage.getLocalProfile();
    let _perfilPessoal = _localProfile['perfilPessoal'];
    this.medicamentos = _perfilPessoal['medicamentos'];
    console.log('this.medicamentos ssssssssssssssssssssssssssss');
    console.log(this.medicamentos);
  }

  ionViewDidLoad(){
    //console.log('ionViewDidLoad ================================================');
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter ================================================');
    //console.log(value);
    this.obterListaMedicamentos();
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter ================================================');
    //console.log(value);
  }

  ionViewWillLeave(){
    //console.log('ionViewWillLeave ================================================');
  }

  ionViewDidLeave(){
    //console.log('ionViewDidLeave ================================================');
  }

  ionViewWillUnload(){
    //console.log('ionViewWillUnload ================================================');
  }

  addMedicamento() {
    this.navCtrl.navigateForward('pessoal-medicamentos-add');
  }

/*
  setFilteredLocations(ev: any){
    let val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== '') {
      return this.medicamentos.filterLocations(val);
    }
  }  
*/
  irParaProximaTela() {
    this.navCtrl.navigateForward('pessoal-alergias'); 
  }

}