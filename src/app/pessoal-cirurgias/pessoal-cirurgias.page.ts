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
  public  tituloJanela    : string = "Cirurgias";
  public  nomeObjetoLista : string = "cirurgias";
  public  nomeObjeto      : string = "cirurgia";
  public  listaItens      : any;
  private modoCRUD        : string;
  public  somenteLeitura  : boolean;

  constructor(public  navCtrl         : NavController,
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
    this.obterListaItens();
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
    this.modoCRUD = this.activatedRoute.snapshot.paramMap.get('modoCRUD');
    if (this.modoCRUD == 'R') {
      this.somenteLeitura = true;
    }
    else {
      this.somenteLeitura = false;
    }
  }

  obterListaItens() {
    let _localProfile   = this.storage.getLocalUsuarioDados();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.listaItens     = _perfilPessoal[this.nomeObjetoLista];
  }

  exibirRegistro() {

  }

  gravarDados() {
    if (this.usuarioService.enviarDadosDoStorageParaApi() == true) {
      //this.gravaDadosPresentToast();
    }
    this.irParaTelaHome();
  }

  async editRow(slidingItem : IonItemSliding, item : any, pos : number) {
    await slidingItem.close();
    if (item!= null) {
      this.alertModificarItem(pos, item);
    }
  }

  async alertModificarItem(pos: number , obj : any) {
    const alert = await this.alertController.create({
      header: 'Modificar dados',
      //message: '<b>' + obj[this.nomeObjeto]['descricao'] + '</b>',
      inputs: [
        { name: 'descricao',        type: 'text', value: obj.descricao,        placeholder: 'Descrição' },
        { name: 'observacao',       type: 'text', value: obj.observacao,       placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {
            obj['descricao']         = data['descricao'];
            obj['observacao']        = data['observacao'];
            this.storage.modificarRegistroNaLista(pos, obj, this.nomeObjetoLista);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteRow(slidingItem: IonItemSliding, event, item: any, index: number){
    await slidingItem.close();
      if(index > -1){
        this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
        this.obterListaItens();
      }
    }

  adicionarRegistro() {
    this.alertAdicionarItem();
    //this.teste();
  }

  async alertAdicionarItem() {
    let obj = { data: null, descricao: null, observacao: null } ;
    const alert = await this.alertController.create({
      header: 'Adicionar  cirurgia',
      //message: '<b>' + obj['descricao'] + '</b>',
      inputs: [
        { name: 'data',       type: 'text', value: '',  placeholder: 'Data' },
        { name: 'descricao',  type: 'text', value: '',  placeholder: 'Descrição' },
        { name: 'observacao', type: 'text', value: '',  placeholder: 'Observação' }
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: ( data = Response ) => {

            let validateObj = this.validaData(data);
            if (!validateObj.isValid) {
                console.log('Your validation message');
                return false;
            } else {
              obj['data']         = data['data'];
              obj['descricao']    = data['descricao'];
              obj['observacao']   = data['observacao'];
              this.addRegistro(obj);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  validaData(data) {
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(data.data) ){
      return {
        isValid: true,
        message: ''
      };
    } else {
       return {
          isValid: false,
          message: 'Email address is required'
       }
    }
  }

  addRegistro(obj : any) {
    obj['privacidade']   = { };
    this.storage.addRegistroAhLista(obj, this.nomeObjetoLista);
    this.obterListaItens();
  }


  cancelarEdicao() {
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.navCtrl.navigateBack(['pessoal-drogas', {modoCRUD: this.modoCRUD}]);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-dependentes', {modoCRUD: this.modoCRUD}]);
  }

}