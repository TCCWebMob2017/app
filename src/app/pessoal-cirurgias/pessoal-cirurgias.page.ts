import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from '../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pessoal-cirurgias',
  templateUrl: './pessoal-cirurgias.page.html',
  styleUrls: ['./pessoal-cirurgias.page.scss'],
})

export class PessoalCirurgiasPage implements OnInit {
  public  tituloJanela            : string = "Cirurgias";
  public  nomeObjetoLista         : string = "cirurgias";
  public  nomeObjeto              : string = "cirurgia";
  public  listaItens              : any;
  private modoCRUD                : string;
  public  somenteLeitura          : boolean;
  public  exibirBarraDeNavegacao  : boolean;
  public  navegacaoPaginaAnterior : string = "pessoal-drogas";
  public  navegacaoProximaPagina  : string = "pessoal-dependentes";
  public  navegacaoPaginaAdd      : string = "pessoal-cirurgias-add";    

  constructor(public  navCtrl         : NavController,
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.obterParametrosRecebidos();
    this.obterListaItens();
  }

  ionViewDidLoad(){}
  ionViewDidEnter(){}
  ionViewWillLeave(){}
  ionViewDidLeave(){}
  ionViewWillUnload(){}

  obterParametrosRecebidos() {
    let _parametros = this.storage.getLocalParametros();
    this.modoCRUD               = _parametros['modoCRUD'];
    this.somenteLeitura         = _parametros['somenteLeitura'];
    this.exibirBarraDeNavegacao = _parametros['exibirBarraDeNavegacao'];
  }

  obterListaItens() {
    let _localProfile   = this.storage.getLocalUsuarioDados();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.listaItens     = _perfilPessoal[this.nomeObjetoLista];
    console.log(this.listaItens);
  }

  exibirRegistro() { }

  setRegistroModoEditar() {
    this.modoCRUD       = 'U';
    this.somenteLeitura = false;
    this.storage.setLocalParametros('modoCRUD', this.modoCRUD);
    this.storage.setLocalParametros('somenteLeitura', this.somenteLeitura);
  }

  setRegistroModoVisualizar() {
    this.modoCRUD       = 'R';
    this.somenteLeitura = true;
    this.storage.setLocalParametros('modoCRUD', this.modoCRUD);
    this.storage.setLocalParametros('somenteLeitura', this.somenteLeitura);
  }

  slidingClose(slidingItem : IonItemSliding) {
    if (this.somenteLeitura == true) {
      slidingItem.close();
    }
  }


  gravarDados(voltarParaTelaAnterior : boolean) {
    if (this.usuarioService.enviarDadosDoStorageParaApi() == true) {
      //this.gravaDadosPresentToast();
    }
    if (voltarParaTelaAnterior) {
      this.irParaTelaHome();
    }
    else {
      this.setRegistroModoVisualizar();
    }
  }

  adicionarRegistro() {
    this.alertAdicionarItem();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.navCtrl.navigateBack([this.navegacaoPaginaAnterior]);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward([this.navegacaoProximaPagina]);
  }

  async editRow(slidingItem : IonItemSliding, item : any, pos : number) {
    await slidingItem.close();
    if (item!= null) {
      this.alertModificarItem(pos, item);
    }
  }

  async deleteRow(slidingItem: IonItemSliding, event, item: any, index: number, dele : boolean){    
    if (this.somenteLeitura != true && dele == true) {
      await slidingItem.close();
      if(index > -1){
        this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
        this.obterListaItens();
      }
    }
  }

  
  async alertModificarItem(pos: number , obj : any) {

    let _data = this.formataData(obj['data'], '');

    const alert = await this.alertController.create({
      header: 'Modificar dados',
      //message: '<b>' + obj[this.nomeObjeto]['descricao'] + '</b>',
      inputs: [
        { name: 'data',       type: 'date', value: _data,           placeholder: 'Data' },
        { name: 'descricao',  type: 'text', value: obj.descricao,   placeholder: 'Descrição' },
        { name: 'observacao', type: 'text', value: obj.observacao,  placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {
            let _data = this.formataData(data['data'], 'pt-br');         
            obj['data']       = _data;
            obj['descricao']  = data['descricao'];
            obj['observacao'] = data['observacao'];
            this.storage.modificarRegistroNaLista(pos, obj, this.nomeObjetoLista);
          }
        }
      ]
    });
    await alert.present();
  }

  formataData(data, formato) {
    if (data == null) { data = ''; }
    if (formato == 'pt-br') {
      return (data.substr(0, 10).split('-').reverse().join('/'));
    } else {
      return (data.substr(0, 10).split('/').reverse().join('-'));
    }
  }

  async alertAdicionarItem() {
    let obj = { data: null, descricao: null, observacao: null } ;
    const alert = await this.alertController.create({
      header: 'Adicionar  cirurgia',
      //message: '<b>' + obj['descricao'] + '</b>',
      inputs: [
        { name: 'descricao',  type: 'text', value: '',  placeholder: 'Descrição' },
        { name: 'data',       type: 'date', value: '',  placeholder: 'Data' },
        { name: 'observacao', type: 'text', value: '',  placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {
            let _data = this.formataData(data['data'], 'pt-br');
            obj['descricao']    = data['descricao'];
            obj['data']         = _data;
            obj['observacao']   = data['observacao'];
            this.addRegistro(obj);


            console.log(this.formataData(data['data'], ''));
            console.log(this.formataData(data['data'], 'pt-br'));

          }
        }
      ]
    });
    await alert.present();
  }

  addRegistro(obj : any) {
    obj['privacidade']   = { };
    this.storage.addRegistroAhLista(obj, this.nomeObjetoLista);
    this.obterListaItens();
  }

}