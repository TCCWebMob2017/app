import { MedicamentoDTO } from './../models/medicamentos';
import { PessoalService } from './../services/pessoal.service';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pessoal-medicamentos-add',
  templateUrl: './pessoal-medicamentos-add.page.html',
  styleUrls: ['./pessoal-medicamentos-add.page.scss'],
})
export class PessoalMedicamentosAddPage implements OnInit {

  public medicamentos_all: any;
  public medicamentos: any;
  searchTerm: string = '';

  constructor(public  navCtrl         : NavController, 
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  alertController : AlertController) { }

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
      this.alertConfirmarAdicaoDeItem(value);
    }
  }


  async alertConfirmarAdicaoDeItem(value : any) {
    const alert = await this.alertController.create({
      header: 'Adicionar medicamento',
      message: 'O medicamento <b>' + value['nome'] + '</b> será adicionado.',
      inputs: [
        { name: 'frequencia',       type: 'text', value: '', placeholder: 'Frequência de uso' },
        { name: 'dosagem',          type: 'text', value: '', placeholder: 'Dosagem' },
        { name: 'viaAdministracao', type: 'text', value: '', placeholder: 'Via de administração' },
        { name: 'observacao',       type: 'text', value: '', placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {
            let _value = this.addMedicamento(value, data);

            /*
            let navigationExtras: NavigationExtras = {
              queryParams: {
                  currency: JSON.stringify(_value),
                  refresh: _value
              }
            };
            //this.navCtrl.navigateForward(['page-slug'], true, navigationExtras);
            */
            

            this.navCtrl.navigateBack(['pessoal-medicamentos', {value: _value}]);
          }
        }
      ]
    });
    await alert.present();
  }


  addMedicamento(value : any, data : any) : any {
    let _medicm = value;
    let _medicamento = { };
    _medicamento['privacidade']       = { };
    _medicamento['frequencia']        = data['frequencia'];
    _medicamento['dosagem']           = data['dosagem'];
    _medicamento['viaAdministracao']  = data['viaAdministracao'];
    _medicamento['observacao']        = data['observacao'];
    _medicamento['medicamento']       = _medicm;
    this.storage.addMedicamentos(_medicamento);
  }    

}