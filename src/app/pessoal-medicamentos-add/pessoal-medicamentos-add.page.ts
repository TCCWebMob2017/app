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

    let _medicm = value;
    let _medicamento = { };
    _medicamento['privacidade']       = { };
    _medicamento['observacao']        = null;
    _medicamento['medicamento']       = _medicm ;
    _medicamento['dosagem']           = null;
    _medicamento['viaAdministracao']  = null;
    this.storage.addMedicamentos(_medicamento);
  }  


}