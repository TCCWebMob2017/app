import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {
  
  //public medicamentos : MedicamentoDTO;
  public medicamentos : any;

  constructor(public  navCtrl         : NavController, 
            //private navParams       : NavParams,
              public  pessoalService  : PessoalService,
              private storage         : StorageService,
              public  usuarioService  : UsuarioService,) { 


              }

  ngOnInit() {
    this.medicamentos = this.storage.getMedicamentos();
    /*
    this.pessoalService.getMedicamentosAll()
    .subscribe(Response => {
        this.medicamentos = Response;
    },
    error => {
      console.log(error);
    });
    */
  }

  obterListaMedicamentos() {
    let _localProfile   = this.storage.getLocalProfile();
    let _perfilPessoal  = _localProfile['perfilPessoal'];
    this.medicamentos   = _perfilPessoal['medicamentos'];
  }

  gravarDados() {
    if (this.usuarioService.enviarDadosDoStorageParaApi()) {
      //this.gravaDadosPresentToast();
      //this.irParaTelaAnterior();
      this.navCtrl.navigateRoot('pessoal');
      //this.navCtrl.navigateBack('pessoal');
    }
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

    console.log(this.value);
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

  adicionarRegistro() {
    this.navCtrl.navigateForward('pessoal-medicamentos-add');
  }

/*
  setFilteredLocations(ev: any){
    let val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== '') {
      return this.medicamentos.filterLocations(val);
    }
  }  
*/
  irParaProximaTela() {
    this.navCtrl.navigateForward('pessoal-alergias'); 
  }

  cancelarEdicao() {
    this.navCtrl.navigateBack('pessoal');
  }

}