import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {  
  public  tituloJanela  : string = "Pessoal : Medicamentos";
  public  medicamentos  : any;
  private modoCRUD      : string;
  public  somenteLeitura: boolean;

  constructor(public  navCtrl         : NavController, 
              public  alertController : AlertController,
              private activatedRoute  : ActivatedRoute,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService) { }

  ngOnInit() {
    this.medicamentos = this.storage.getMedicamentos();
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
  
  obterListaMedicamentos() {
    let _localProfile   = this.storage.getLocalProfile();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.medicamentos   = _perfilPessoal['medicamentos'];
  }

  exibirMedicamento() {

  }
  gravarDados() {
    if (this.usuarioService.enviarDadosDoStorageParaApi() == true) {
      //this.gravaDadosPresentToast();
    }
    this.irParaTelaHome();
  }

  ionViewDidLoad(){
    //console.log('ionViewDidLoad ================================================');
    //console.log(this.value);
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter ================================================');
    //console.log(value);
    
    /*
    let test = this.route.params.subscribe( params  => {
                  console.log(params);
                  this.id = params['id']; });
    */

    /*
    this.theIds$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('value');
      })
    );    
    */
    
    this.obterParametrosRecebidos();
    //let _value  = this.navParams.get('value');
    //console.log(_value);

    //console.log(this.value);
    this.obterListaMedicamentos();
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter ================================================');
    //console.log(value);
  }

  ionViewWillLeave(){
    //console.log('ionViewWillLeave ================================================');
  }

  ionViewDidLeave(){
    //console.log('ionViewDidLeave ================================================');
  }

  ionViewWillUnload(){
    //console.log('ionViewWillUnload ================================================');
  }

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
            this.obterListaMedicamentos();
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
    this.navCtrl.navigateBack(['pessoal-base', {modoCRUD: this.modoCRUD}]);
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-doencas', {modoCRUD: this.modoCRUD}]);
  }

}