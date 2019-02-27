import { MedicamentoDTO } from './../models/medicamentos';
import { PessoalService } from './../services/pessoal.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-medicamentos-add',
  templateUrl: './pessoal-medicamentos-add.page.html',
  styleUrls: ['./pessoal-medicamentos-add.page.scss'],
})
export class PessoalMedicamentosAddPage implements OnInit {

  public medicamentos_all: any;
  public medicamentos: any;
  searchTerm: string = '';
  
  
  constructor(public navCtrl: NavController, 
              public pessoalService: PessoalService,
              private storage: StorageService) { }

  ngOnInit() {

    this.pessoalService.getMedicamentosAll()
    .subscribe(Response => {
      this.medicamentos_all = Response;
      this.medicamentos     = Response;
    },
    error => {
      console.log(error);
    });

  }

  setFilteredItems(ev: any) {
    let val = ev.target.value;
    this.medicamentos = this.pessoalService.filterItems(this.medicamentos_all, val);
  }

  selecionarMedicamento(value: any) {
    if (value!= null) {
      this.addMedicamento(value);
      this.navCtrl.navigateBack(['pessoal-medicamentos', {value: value}]);
    }
  }

  addMedicamento(value: any) {
    //this.navCtrl.navigateForward('pessoal-medicamentos-add');
    //console.log(value);
    let _localProfile = this.storage.getLocalProfile();
    //console.log(_localProfile);
    let _perfilPessoal = _localProfile['perfilPessoal'];
    //console.log(_perfilPessoal);
    let _medicamentos = _perfilPessoal['medicamentos'];
    //console.log(_medicamentos);

    let xMedicamento = [];
    if (_medicamentos != null) {
      xMedicamento = _medicamentos;  
    }
    xMedicamento.push(value); 
    
    //console.log('xMedicamentoooooooooooooooooooooooooooooooooo');
    //console.log(xMedicamento);
    _perfilPessoal['medicamentos'] = xMedicamento;
    _localProfile['perfilPessoal'] = _perfilPessoal;
    //console.log(_localProfile);

    this.storage.setLocalProfile(_localProfile);

  }  


}