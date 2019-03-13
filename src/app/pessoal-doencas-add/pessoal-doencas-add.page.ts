import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from '../services/pessoal.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-doencas-add',
  templateUrl: './pessoal-doencas-add.page.html',
  styleUrls: ['./pessoal-doencas-add.page.scss'],
})
export class PessoalDoencasAddPage implements OnInit {

  public  lista_items       : any;
          searchTerm        : string = '';
  private modoCRUD          : string;
  public  somenteLeitura    : boolean;  

  constructor(public  navCtrl         : NavController,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              private activatedRoute  : ActivatedRoute,
              public  alertController : AlertController) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Will Enter');
    this.obterParametrosRecebidos();
  }

  ionViewDidLoad(){}
  ionViewDidEnter(){}
  ionViewWillLeave(){}
  ionViewDidLeave(){}
  ionViewWillUnload(){}

  obterParametrosRecebidos() {
    this.modoCRUD = this.activatedRoute.snapshot.paramMap.get('modoCRUD');
    if (this.modoCRUD == 'R') {
      this.somenteLeitura = true;
    }
    else {
      this.somenteLeitura = false;
    }
    console.log('PessoalMedicamentosAddPage | modoCRUD: ' + this.modoCRUD);
  }
  
  /*
  setFilteredItems(ev: any) {
    let val = ev.target.value;
    this.medicamentos = this.pessoalService.filterItems(this.medicamentos_all, val);
  }
  */
 
 selecionarRegistro(value: any) {
    if (value!= null) { 
      this.alertConfirmarAdicaoDeItem(value);
    }
  }

  async alertConfirmarAdicaoDeItem(value : any) {
    const alert = await this.alertController.create({
      header: 'Adicionar doença',
      message: 'A doença <b>' + value['nome'] + '</b> será adicionada.',
      inputs: [
        { name: 'desde',            type: 'text', value: '', placeholder: 'Desde' },
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
            let _value = this.addRegistro(value, data);
            this.navCtrl.navigateBack(['pessoal-doencas', {modoCRUD: this.modoCRUD}]);
          }
        }
      ]
    });
    await alert.present();
  }

  addRegistro(value : any, data : any) : any {
    let _novoRegistro = value;
    let _medicamento = { };
    _medicamento['privacidade']       = { };
    _medicamento['desde']             = data['desde'];
    _medicamento['observacao']        = data['observacao'];
    _medicamento['medicamento']       = _novoRegistro;
    this.storage.addMedicamentos(_medicamento);
    return _medicamento;
  }    

  search(nome : string) {
    this.pessoalService.getDoencasPorNome(nome)
    .subscribe(Response => {
      this.lista_items = Response;
    },
    error => {
      console.log(error);
    });
  }
}