import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { UsuarioDTO } from './../models/usuario';
import { PessoalService } from './../services/pessoal.service';
import { perfilPessoal } from '../models/perfilPessoal';


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
  public usuario: UsuarioDTO;

  constructor(
    private navCtrl         : NavController,
    private storage         : StorageService,
    //public  pessoalService  : PessoalService,
    public  usuarioService  : UsuarioService,
    private formBuilder     : FormBuilder,
    //private modalController : ModalController,
    public  toastController : ToastController,
    public  alertController : AlertController   
    ) { 
      this.position = "floating";
      //this.position = "fixed";
      this.myDate = new Date();
      this.maxSelectableDate = this.formatDate(this.myDate);
    }

  ngOnInit() {

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


  irParaProximaTela(value : any) {
    this.moverValoresFormParaSotage(value);
    this.navCtrl.navigateForward('pessoal-doencas');
  }


  onSubmit(value: any) {
    this.submitted = true;
    this.moverValoresFormParaSotage(value);    
    this.gravarDados();
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


  gravarDados() {
    if (this.usuarioService.enviarDadosDoStorageParaApi()) {
      this.gravaDadosPresentToast();
      alert('Okkk');
      this.irParaTelaAnterior();
    }
  }


  async gravaDadosPresentToast() {
    const toast = await this.toastController.create({
      message: 'Dados gravados com sucesso.',
      duration: 2000
    });
    toast.present();
  }  


  
  /*
  {
    "acidentes": [
      {
        "data": "dd/MM/yyyy",
        "descricao": "string",
        "gravidade": "string",
        "implicacoes": "string",
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "alergias": [
      {
        "alergia": {
          "agenteCausador": "string",
          "categoria": "string",
          "created": "dd/MM/yyyy HH:mm:ss",
          "descricao": "string",
          "id": "string",
          "nome": "string",
          "reacoesAdversas": "string"
        },
        "desde": "dd/MM/yyyy",
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "altura": value.altura,
    "cirurgias": [
      {
        "data": "dd/MM/yyyy",
        "descricao": "string",
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "condicoesEspeciais": [
      {
        "descricao": "string",
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "contatoEmergencia": [
      {
        "created": "dd/MM/yyyy HH:mm:ss",
        "email": "string",
        "id": "string",
        "nivelPermissao": {},
        "nome": "string",
        "relacao": "string",
        "telefone": "string"
      }
    ],
    "contatos": [
      {
        "created": "dd/MM/yyyy HH:mm:ss",
        "email": "string",
        "id": "string",
        "nivelPermissao": {},
        "nome": "string",
        "relacao": "string",
        "telefone": "string"
      }
    ],
    "convenios": [
      {
        "codigousuarioConvenio": "string",
        "nomeConvenio": "string",
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "cpf": '"' + value.cpf + '"',
    "created": "dd/MM/yyyy HH:mm:ss",
    "dependentes": [
      {
        "observacao": "string",
        "parentesco": "0",
        "perfil": {},
        "privacidade": {}
      }
    ],
    "doadorOrgao": true,
    "doadorSangue": true,
    "doencas": [
      {
        "desde": "dd/MM/yyyy",
        "doenca": {
          "cid": "string",
          "created": "dd/MM/yyyy HH:mm:ss",
          "descricao": "string",
          "id": "string",
          "nome": "string",
          "nomesPopulares": [
            "string"
          ]
        },
        "observacao": "string",
        "privacidade": {}
      }
    ],
    "drogas": [
      {
        "desde": "dd/MM/yyyy",
        "frequecia": "string",
        "observacao": "string",
        "privacidade": {},
        "quantidade": "string"
      }
    ],
    "id": "string",
    "medicamentos": [
      {
        "dosagem": "string",
        "frequencia": "string",
        "medicamento": {
          "codigoATC": "string",
          "composicao": "string",
          "concentracao": "string",
          "contraindicacao": "string",
          "contraindicacoes": "string",
          "created": "dd/MM/yyyy HH:mm:ss",
          "dosagemAdultos": "string",
          "dosagemPediatrica": "string",
          "efeitosColaterais": "string",
          "formaFarmaceutica": "string",
          "generico": true,
          "gravidez": "string",
          "id": "string",
          "indicacao": "string",
          "laboratorio": "string",
          "lactacao": "string",
          "nome": "string",
          "nomeComercial": "string",
          "principioAtivo": "string",
          "reacoesAdversas": "string"
        },
        "observacao": "string",
        "privacidade": {},
        "viaAdministracao": "string"
      }
    ],
    "nascimento": "04/11/1975",
    "nome": "Alcenir Felix",
    "peso": 74,
    "praticaEsporte": true,
    "privacidade": [
      "RESTRITO"
    ],
    "profissionais": [
      {
        "created": "dd/MM/yyyy HH:mm:ss",
        "email": "string",
        "id": "string",
        "nivelPermissao": {},
        "nome": "string",
        "relacao": "string",
        "telefone": "string"
      }
    ],
    "protocolosEmergencias": [
      {
        "descricao": "string",
        "observacao": "string",
        "privacidade": {},
        "tipoEmergencia": "string"
      }
    ],
    "residencia": {
      "bairro": "string",
      "cep": "string",
      "cidade": "string",
      "estado": "string",
      "logradouro": "string",
      "nomeLocal": "string",
      "numero": "string"
    },
    "rg": "25532296",
    "sexo": value.sexo,
    "telefone": "1231326282",
    "trabalho": {
      "bairro": "string",
      "cep": "string",
      "cidade": "string",
      "estado": "string",
      "logradouro": "string",
      "nomeLocal": "string",
      "numero": "string"
    },
    "tipoSangue": "O",
    "tipoPerfil": "PESSOAL"
  }
  */

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
          text: 'Cancel',
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

  irParaTelaAnterior() {
    this.navCtrl.navigateBack('pessoal');
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
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }    

}

