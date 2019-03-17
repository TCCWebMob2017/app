import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { NavController, AlertController, IonItemSliding } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {  
  public  tituloJanela            : string = "Medicamentos";
  public  nomeObjetoLista         : string = "medicamentos";
  public  nomeObjeto              : string = "medicamento";
  public  listaItens              : any;
  public  modoCRUD                : string;
  public  somenteLeitura          : boolean;
  public  exibirBarraDeNavegacao  : boolean;
  public  navegacaoPaginaAnterior : string = "pessoal-base";
  public  navegacaoProximaPagina  : string = "pessoal-doencas";
  public  navegacaoPaginaAdd      : string = "pessoal-medicamentos-add";

  constructor(public  navCtrl         : NavController, 
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
    this.listaItens = this.storage.getMedicamentos();
  }

  exibirRegistro(item : any) { }

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
    //if (!item.canSwipe) {
    if (this.somenteLeitura == true) {
      slidingItem.close();
      //ev.close();
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
    this.navCtrl.navigateForward([this.navegacaoPaginaAdd]);
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

  async alertModificarItem(pos: number , obj : any) {
    const alert = await this.alertController.create({
      header: 'Modificar dados',
      message: '<b>' + obj['medicamento']['nome'] + '</b>',
      inputs: [
        { name: 'frequencia',       type: 'text', value: obj.frequencia,       placeholder: 'Frequência de uso' },
        { name: 'dosagem',          type: 'text', value: obj.dosagem,          placeholder: 'Dosagem' },
        { name: 'viaAdministracao', type: 'text', value: obj.viaAdministracao, placeholder: 'Via de administração' },
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
            obj['frequencia']        = data['frequencia'];
            obj['dosagem']           = data['dosagem'];
            obj['viaAdministracao']  = data['viaAdministracao'];
            obj['observacao']        = data['observacao'];
            this.storage.modificarMedicamento(pos, obj);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteRow(slidingItem: IonItemSliding, event, item: any, index: number, dele : boolean){
    if (this.somenteLeitura != true && dele == true) {
      await slidingItem.close();
      //let indexx = this.medicamentos.indexOf(item); 
      if(index > -1){
        //this.medicamentos.splice(index, 1);
        this.storage.removeMedicamento(index);
        this.obterListaItens();
      }  
    }
  }

  async deleteRow_Back(position) {
    const alert = await this.alertController.create({
      header:  'Eliminar registro',
      message: 'O medicamento será eliminado.',
      buttons: [
        {
          text: 'Cancelar', role: 'cancel', cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Ok',
          handler: () => {
            this.storage.removeMedicamento(position);
            this.obterListaItens();
          }
        }
      ]
    });
    await alert.present();
  }

}