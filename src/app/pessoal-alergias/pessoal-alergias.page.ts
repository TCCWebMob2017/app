import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding, ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from '../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pessoal-alergias',
  templateUrl: './pessoal-alergias.page.html',
  styleUrls: ['./pessoal-alergias.page.scss'],
})

export class PessoalAlergiasPage implements OnInit {
  public  tituloJanela            : string = "Alergias";
  public  nomeObjetoLista         : string = "alergias";
  public  nomeObjeto              : string = "alergia";
  public  listaItens              : any;
  private modoCRUD                : string;
  public  somenteLeitura          : boolean;
  public  exibirBarraDeNavegacao  : boolean;
  public  navegacaoPaginaAnterior : string = "pessoal-doencas";
  public  navegacaoProximaPagina  : string = "pessoal-drogas";
  public  navegacaoPaginaAdd      : string = "pessoal-alergias-add";

  constructor(public  navCtrl         : NavController, 
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService,
              public actionSheetController: ActionSheetController) { }

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
    let _localProfile   = this.storage.getLocalUsuarioPessoal();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.listaItens     = _perfilPessoal[this.nomeObjetoLista];
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
    this.navCtrl.navigateForward(this.navegacaoPaginaAdd);
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
        this.confirmarExcluirRegistro(index);
      }
    }
  }

  // ------------------------------------------------------------------------------
  async alertModificarItem(pos: number , obj : any) {
    const alert = await this.alertController.create({
      header: 'Modificar dados',
      message: '<b>' + obj[this.nomeObjeto]['nome'] + '</b>',
      inputs: [
      //{ name: 'dosagem',          type: 'text', value: obj.dosagem,          placeholder: 'Dosagem' },
        { name: 'observacao',       type: 'text', value: obj.observacao,       placeholder: 'Observação' }
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
            //obj['desde']           = data['desde'];
            obj['observacao']        = data['observacao'];

            
            this.storage.modificarRegistroNaLista(pos, obj, this.nomeObjetoLista);
          }
        }
      ]
    });
    await alert.present();
  }
  
  async confirmarExcluirRegistro(index : number) {
    const actionSheet = await this.actionSheetController.create({
      //header: 'Confirmação',
      buttons: [{
        text: 'Excluir alergia',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
          this.obterListaItens();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }    
}