import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
  public  tituloJanela  : string = "Doenças";
  public  listaItens       : any;
  private modoCRUD      : string;
  public  somenteLeitura: boolean;

  constructor(public  navCtrl         : NavController, 
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
    this.listaItens = this.storage.getMedicamentos();
  }

  obterParametrosRecebidos() {
    this.modoCRUD = this.activatedRoute.snapshot.paramMap.get('modoCRUD');
    if (this.modoCRUD == 'R') {
      this.somenteLeitura = true;
    }
    else {
      this.somenteLeitura = false;
    }
  }

  obterListaDoencas() {
    let _localProfile   = this.storage.getLocalProfile();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.listaItens     = _perfilPessoal['doencas'];
  }

  exibirMedicamento() {

  }

  gravarDados() {
    if (this.usuarioService.enviarDadosDoStorageParaApi() == true) {
      //this.gravaDadosPresentToast();
    }
    this.irParaTelaHome();
  }

  ionViewWillEnter(){
    this.obterParametrosRecebidos();
    this.obterListaDoencas();
  }

  ionViewDidLoad(){}
  ionViewDidEnter(){}
  ionViewWillLeave(){}
  ionViewDidLeave(){}
  ionViewWillUnload(){}

  editRow(pos : number, value: any) {
    if (value!= null) { 
      this.alertModificarItem(pos, value);
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

  async deleteRow(position) {
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
            this.obterListaDoencas();
          }
        }
      ]
    });
    await alert.present();
  }    

  adicionarRegistro() {
    this.navCtrl.navigateForward('pessoal-medicamentos-add');
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