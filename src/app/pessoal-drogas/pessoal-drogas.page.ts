import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from '../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pessoal-drogas',
  templateUrl: './pessoal-drogas.page.html',
  styleUrls: ['./pessoal-drogas.page.scss'],
})
export class PessoalDrogasPage implements OnInit {
  public  tituloJanela    : string = "Drogas";
  public  nomeObjetoLista : string = "drogas";
  public  nomeObjeto      : string = "droga";
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
      message: '<b>' + obj[this.nomeObjeto]['nome'] + '</b>',
      inputs: [
        { name: 'frequecia',        type: 'text', value: obj.dosagem,          placeholder: 'Frequência' },
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
            obj['frequecia']         = data['frequecia'];
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
      console.log('deleteRow');
      if(index > -1){
        this.storage.removeRegistroDaLista(index, this.nomeObjetoLista);
        this.obterListaItens();
        console.log(this.listaItens);
      }
    }

  adicionarRegistro() {
    this.navCtrl.navigateForward('pessoal-drogas-add');
  }

  cancelarEdicao() {
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.navCtrl.navigateBack(['pessoal-alergias', {modoCRUD: this.modoCRUD}]);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-cirurgias', {modoCRUD: this.modoCRUD}]);
  }

}