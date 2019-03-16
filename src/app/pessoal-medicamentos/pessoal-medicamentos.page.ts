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

  constructor(public  navCtrl         : NavController, 
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
    console.log('PessoalMedicamentosPage | ngOnInit');
    this.obterListaItens();
  }

  ionViewWillEnter() {
    console.log('PessoalMedicamentosPage | Will Enter');
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

  setModoCrudRegistro(parCrud : string) {
    if((parCrud != 'C') && (parCrud != 'R') && (parCrud != 'U') && (parCrud != 'D')) { 
      parCrud = 'R';
    }
    this.modoCRUD       = parCrud;
    this.somenteLeitura = (this.modoCRUD == 'R' ? true : false); 
  }
  
  obterListaItens() {
    console.log('obterListaMedicamentos');
    this.listaItens = this.storage.getMedicamentos();
    console.log(this.listaItens);
  }

  exibirRegistro(item : any) {
    console.log('exibirMedicamento  [' + this.somenteLeitura + ']');
  }
  
  /*
  editarRegistro() {
    if (this.modoCRUD == 'R') {
      this.modoCRUD       = 'U';
      this.somenteLeitura = false;
    }
  }
  */

  slidingClose(slidingItem : IonItemSliding) {
    //if (!item.canSwipe) {
    if (this.somenteLeitura == true) {
      slidingItem.close();
      //ev.close();
    }
  }

  gravarDados() {
    //this.moverValoresFormParaSotage(value);
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

  /*
  async modificarItem(slidingItem: IonItemSliding) {
    await slidingItem.close();
    console.log('Modificar');
  }  
  */

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

  async deleteRow(slidingItem: IonItemSliding, event, item: any, index: number){
    if (this.somenteLeitura != true) {
      await slidingItem.close();
      //let indexx = this.medicamentos.indexOf(item); 
      console.log('deleteRow');
      if(index > -1){
        //this.medicamentos.splice(index, 1);
        this.storage.removeMedicamento(index);
        this.obterListaItens();
        console.log(this.listaItens);
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

  adicionarRegistro() {
    this.navCtrl.navigateForward(['pessoal-medicamentos-add']);
  }

  cancelarEdicao() {
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.navCtrl.navigateBack(['pessoal-base']);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-doencas']);
  }

}