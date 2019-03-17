import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from '../services/pessoal.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-alergias-add',
  templateUrl: './pessoal-alergias-add.page.html',
  styleUrls: ['./pessoal-alergias-add.page.scss'],
})
export class PessoalAlergiasAddPage implements OnInit {
  public  tituloJanela      : string = "Adicionar alergia";
  public  nomeObjetoLista   : string = "alergias";
  public  nomeObjeto        : string = "alergia";
  public  paginaAnterior    : string = "pessoal-alergias";
  public  lista_items       : any;
          searchTerm        : string = '';

  constructor(public  navCtrl         : NavController,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              private activatedRoute  : ActivatedRoute,
              public  alertController : AlertController) { 
  }

  ngOnInit() {}
  ionViewWillEnter() { }
  ionViewDidLoad(){}
  ionViewDidEnter(){}
  ionViewWillLeave(){}
  ionViewDidLeave(){}
  ionViewWillUnload(){}

 selecionarRegistro(value: any) {
    if (value!= null) { 
      this.alertConfirmarAdicaoDeItem(value);
    }
  }

  async alertConfirmarAdicaoDeItem(value : any) {
    const alert = await this.alertController.create({
      header: this.tituloJanela,
      message: 'O item <b>' + value['nome'] + '</b> será adicionado.',
      inputs: [
      //{ name: 'desde',            type: 'text', value: '', placeholder: 'Desde' },
        { name: 'observacao',       type: 'text', value: '', placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {
            let _value = this.addRegistro(value, data);
            this.navCtrl.navigateBack([this.paginaAnterior]);
          }
        }
      ]
    });
    await alert.present();
  }

  addRegistro(value : any, data : any) : any {
    let _obj = { };
    _obj['privacidade']   = { };
  //_obj['desde']         = data['desde'];
    _obj['desde']         = null;
    _obj['observacao']    = data['observacao'];
    _obj[this.nomeObjeto] = value;
    this.storage.addRegistroAhLista(_obj, this.nomeObjetoLista);
    return _obj;
  }

  search(nome : string) {
    if(nome.length >= 3) {
      nome = nome.toLowerCase();
      this.pessoalService.getAlergiasPorNome(nome)
      .subscribe(Response => {
        this.lista_items = Response;
      },
      error => {  });  
    }
  }
}