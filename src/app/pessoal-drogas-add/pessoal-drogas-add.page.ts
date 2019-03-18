import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pessoal-drogas-add',
  templateUrl: './pessoal-drogas-add.page.html',
  styleUrls: ['./pessoal-drogas-add.page.scss'],
})
export class PessoalDrogasAddPage implements OnInit {
  public  tituloJanela      : string = "Adicionar droga";
  public  nomeObjetoLista   : string = "drogas";
  public  nomeObjeto        : string = "droga";
  public  paginaAnterior    : string = "pessoal-drogas";
  public  lista_items       : any;
          searchTerm        : string = '';
  public  exibirSearchBar   : boolean = false;

  constructor(public  navCtrl         : NavController ,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              private activatedRoute  : ActivatedRoute,
              public  alertController : AlertController) { 
  }

  ngOnInit() {
    if (this.exibirSearchBar != true) {
      this.pessoalService.getDrogasPorNome("")
      .subscribe(Response => {
        this.lista_items = Response;
      },
      error => { });
    }
  }

  ionViewWillEnter() {}
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
        { name: 'frequecia',        type: 'text', value: '', placeholder: 'Frequência' },
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
            this.navCtrl.navigateBack([ this.paginaAnterior]);
          }
        }
      ]
    });
    await alert.present();
  }

  addRegistro(value : any, data : any) : any {
    let _obj = { };
    _obj['privacidade']   = { };
    _obj['frequecia']     = data['frequecia'];
    _obj['observacao']    = data['observacao'];
    _obj[this.nomeObjeto] = value;
    this.storage.addRegistroAhLista(_obj, this.nomeObjetoLista);
    return _obj;
  }

  search(nome : string) {
    nome = nome.toLowerCase();
    this.pessoalService.getDrogasPorNome(nome)
    .subscribe(Response => {
      this.lista_items = Response;
    },
    error => { });
  }
}