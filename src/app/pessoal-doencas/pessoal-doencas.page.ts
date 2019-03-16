import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, IonItemSliding } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { PessoalService } from '../services/pessoal.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pessoal-doencas',
  templateUrl: './pessoal-doencas.page.html',
  styleUrls: ['./pessoal-doencas.page.scss'],
})
export class PessoalDoencasPage implements OnInit {
  public  tituloJanela            : string = "Doenças";
  public  nomeObjetoLista         : string = "doencas";
  public  nomeObjeto              : string = "doenca";
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
    let _parametros = this.storage.getLocalParametros();
    this.modoCRUD               = _parametros['modoCRUD'];
    this.somenteLeitura         = _parametros['somenteLeitura'];
    this.exibirBarraDeNavegacao = _parametros['exibirBarraDeNavegacao'];
    console.log(_parametros);
  }

  setModoCrudRegistro(parCrud : string) {
    if((parCrud != 'C') && (parCrud != 'R') && (parCrud != 'U') && (parCrud != 'D')) { 
      parCrud = 'R';
    }
    this.modoCRUD       = parCrud;
    this.somenteLeitura = (this.modoCRUD == 'R' ? true : false); 
  }

  obterListaItens() {
    let _localProfile   = this.storage.getLocalUsuarioDados();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.listaItens     = _perfilPessoal[this.nomeObjetoLista];
  }

  exibirRegistro() {

  }

  slidingClose(slidingItem : IonItemSliding) {
    if (this.somenteLeitura == true) {
      slidingItem.close();
    }
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
            //obj['dosagem']           = data['dosagem'];
            obj['observacao']        = data['observacao'];
            this.storage.modificarRegistroNaLista(pos, obj, this.nomeObjetoLista);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteRow(slidingItem: IonItemSliding, event, item: any, index: number){
    if (this.somenteLeitura != true) {
      await slidingItem.close();
      console.log('deleteRow');
      if(index > -1){
        this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
        this.obterListaItens();
        console.log(this.listaItens);
      }
    }
  }

  adicionarRegistro() {
    this.navCtrl.navigateForward('pessoal-doencas-add');
  }

  cancelarEdicao() {
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.navCtrl.navigateBack(['pessoal-medicamentos', {modoCRUD: this.modoCRUD}]);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-alergias', {modoCRUD: this.modoCRUD}]);
  }

}