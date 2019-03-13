import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { UsuarioDTO } from './../models/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoal-base',
  templateUrl: './pessoal-base.page.html',
  styleUrls: ['./pessoal-base.page.scss']
})
export class PessoalBasePage implements OnInit {

  formGroup: FormGroup;
  submitted: boolean;
  position:  string;
  minSelectableDate = '1900-01-01';
  maxSelectableDate;
  myDate;
  public  usuario       : UsuarioDTO;
  private modoCRUD      : string;
  public  somenteLeitura: boolean;

  constructor(
    private navCtrl         : NavController,
    private storage         : StorageService,
    public  usuarioService  : UsuarioService,
    private formBuilder     : FormBuilder,
    private activatedRoute  : ActivatedRoute,
    public  toastController : ToastController,
    public  alertController : AlertController 
    ) { 
      this.position = "floating";
      //this.position = "fixed";
      this.myDate = new Date();
      this.maxSelectableDate = this.formatDate(this.myDate);
    }

  ngOnInit() {

    this.obterParametrosRecebidos();
    this.usuario = this.storage.getLocalProfile();
    this.formGroup = this.formBuilder.group({
      nome:       ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      peso:       ['' , [Validators.required, Validators.min(10)]],
      altura:     ['', [Validators.required, Validators.min(10)]],
      nascimento: ['', [Validators.required]],
      tipoSangue: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
      //email:      ['', [Validators.required, Validators.email]],
      //username:   ['', [Validators.required, Validators.minLength(10)]],
      //password: new FormControl(''),
    });
  }
  obterParametrosRecebidos() {
    this.modoCRUD = this.activatedRoute.snapshot.paramMap.get('modoCRUD');
    console.log('modoCRUD: ' + this.modoCRUD);
    if (this.modoCRUD == 'R') {
      this.somenteLeitura = true;
    }
    else {
      this.somenteLeitura = false;
    }
  }

  generoDescricao() : string {
    if(this.usuario.perfilPessoal.sexo == 'F') {
      return "Feminino";
    }
    else if(this.usuario.perfilPessoal.sexo == 'M') {
      return "Masculino";
    }
    return "";
  }

  onSubmit(value : any) {
    this.submitted = true;
    this.moverValoresFormParaSotage(value);
    this.gravarDadosNaApi();
  }


  moverValoresFormParaSotage(value : any) {
    if (this.usuario['perfilPessoal'] == null) {
      let _perfilPessoal : any = { "id": null };
      this.usuario['perfilPessoal'] = _perfilPessoal;
    }
    this.usuario['perfilPessoal']['nome']           = value.nome,
    this.usuario['perfilPessoal']['tipoPerfil']     = "PESSOAL",
    this.usuario['perfilPessoal']['telefone']       = value.telefone,
    this.usuario['perfilPessoal']['nascimento']     = value.nascimento,
    this.usuario['perfilPessoal']['sexo']           = value.sexo,
    this.usuario['perfilPessoal']['praticaEsporte'] = value.praticaEsporte,
    this.usuario['perfilPessoal']['doadorOrgao']    = value.doadorOrgao,
    this.usuario['perfilPessoal']['doadorSangue']   = value.doadorSangue,
    this.usuario['perfilPessoal']['tipoSangue']     = value.tipoSangue,
    this.usuario['perfilPessoal']['altura']         = value.altura,
    this.usuario['perfilPessoal']['peso']           = value.peso,
    this.usuario['perfilPessoal']['rg']             = value.rg,
    this.usuario['perfilPessoal']['cpf']            = value.cpf
    this.storage.setUsuarioDados(this.usuario);
  }

  gravarDados(value : any) {
    this.submitted = true;
    this.moverValoresFormParaSotage(value);
    this.gravarDadosNaApi();
  }

  gravarDadosNaApi(){

    if (this.usuarioService.enviarDadosDoStorageParaApi()) {
      //this.gravaDadosPresentToast();
    }
    this.irParaTelaAnterior();

  }

  async gravaDadosPresentToast() {
    const toast = await this.toastController.create({
      message: 'Dados gravados com sucesso.',
      duration: 2000
    });
    toast.present();
  }  

  validation_messages = {
    'nome': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],
    'peso': [
      { type: 'required', message: 'Peso é obrigatório.' },
      { type: 'pattern' , message: 'Informe um peso válido.' },
      { type: 'min'     , message: 'peso / min.' }
    ],
    'altura': [
      { type: 'required', message: 'Altura é obrigatória.' },
      { type: 'pattern', message: 'Informe uma altura válida.' },
      { type: 'min', message: 'Alrura / Min' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email must be at least 5 characters long.' }
    ]
  }

  async deletePerfilPessoal() {
    const alert = await this.alertController.create({
      header: 'Excluir registro',
      message: 'O Perfil Pessoal será excuído.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          //console.log('Confirm Cancel');
          }          
        }, 
        {
          text: 'Ok',
          handler: () => {
            let _idUsuario = this.usuario['id'];
            console.log(_idUsuario);
            if (_idUsuario != null) {
              this.usuarioService.excluirPerfilPessoal(_idUsuario)
              .subscribe(Response => {
                this.deletePresentToast();
                this.irParaTelaAnterior();
              },
              error => {
                console.log(error);
              });
            }
            //console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }  

  async deletePresentToast() {
    const toast = await this.toastController.create({
      message: 'Perfil excluido.',
      duration: 2000
    });
    toast.present();
  } 

  /*
  for (let i = 0; i < (Object.keys(_perfilPessoal).length); i++) {
    let field_name = Object.keys(_perfilPessoal)[i];
    let field_value = _perfilPessoal[field_name];
    //console.log('_perfilPessoal[i]' + i);
    let resultt = i +  ' campo: ' +  field_name + ' / valor: ' + field_value;
  }
  */

   formatDate(date) {
    let _date = new Date(date),
        day   = '' + _date.getDate(),
        month = '' + (_date.getMonth() + 1),
        year  = _date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2)   day   = '0' + day;
    return [year, month, day].join('-');
  }

  cancelarEdicao() {
    this.irParaTelaHome();
  }

  irParaTelaHome() {
    this.navCtrl.navigateBack('pessoal');
  }

  irParaTelaAnterior() {
    this.irParaTelaHome();
  }

  irParaProximaTela(value : any) {
    if (this.somenteLeitura != true) {
      this.moverValoresFormParaSotage(value);
    }
    this.navCtrl.navigateForward(['pessoal-medicamentos', {modoCRUD: this.modoCRUD}]);
  }

  _irParaProximaTela() {
    this.navCtrl.navigateForward(['pessoal-doencas', {modoCRUD: this.modoCRUD}]);
  }


}

