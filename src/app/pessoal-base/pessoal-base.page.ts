import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { perfilUsuario } from '../models/perfilUsuario';
import { PessoalService } from './../services/pessoal.service';


@Component({
  selector: 'app-pessoal-base',
  templateUrl: './pessoal-base.page.html',
  styleUrls: ['./pessoal-base.page.scss']
})
export class PessoalBasePage implements OnInit {

  formGroup: FormGroup;
  submitted: boolean;
  position:  string;

  customAlertOptions: any = {
    header: 'Tipo sanguíneo',
    //subHeader: 'Subheaderrrr',
    //message: 'messageeeeeee',
    translucent: false
  };

  customPopoverOptions: any = {
    header: 'Tipo sanguíneo'
    //subHeader: 'Tipo sanguíneo',
    //message: 'Selecione o seu tipo sanguíneo'
  };  


  minSelectableDate = '1900-01-01';
  maxSelectableDate;
  myDate;
  
  //public perfilUsuario: any;
  public perfilUsuario: perfilUsuario;
  public cmb_genero: string;

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    public pessoalService: PessoalService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController   
    ) { 
      
      this.position = "floating";
      //this.position = "fixed";

      this.myDate = new Date();
      this.maxSelectableDate = this.formatDate(this.myDate);

    }

  formatDate(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  ngOnInit() {

    this.perfilUsuario = this.storage.getLocalProfile();
    //console.log(this.perfilUsuario);

    
    if (this.perfilUsuario['perfilPessoal'] != null) {
      this.cmb_genero = this.perfilUsuario['perfilPessoal'].sexo;
    }
    else {
      this.cmb_genero = "";
    }

    //let _nome: string;
    //_nome = this.perfilUsuario.perfilPessoal.nome + " _0";
    //_nome = this.perfilUsuario.JSON().nome;

    //console.log(this.test(this.perfilUsuario.perfilPessoal.nome))
    //console.log(_nome);

    this.formGroup = this.formBuilder.group({
      //username: new FormControl(''),
      nome:       ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      //peso:       [this.perfilUsuario.perfilPessoal.peso , [Validators.required, Validators.min(10)]],
      peso:       ['' , [Validators.required, Validators.min(10)]],
      altura:     ['', [Validators.required, Validators.min(10)]],
      nascimento: ['', [Validators.required]],
      tipoSangue: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
      //email:      ['', [Validators.required, Validators.email]],
      //username:   ['', [Validators.required, Validators.minLength(10)]],
      //password: new FormControl(''),
    });
  }



  onSubmit(value: any) {

    this.submitted = true;
    // stop here if form is invalid
    //if (this.loginForm.invalid) {
    //  return;
    //}
    //console.log('submit --------->');
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroup.value))
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(value))
    
    //console.log('value ------------->');
    //console.log(value);
    //console.log(JSON.stringify(value)); 
    //console.log(this.perfilUsuario);

    let _idUsuario = this.perfilUsuario['id'];

    /*
    let _perfilPessoal: perfilPessoal;
    _perfilPessoal = this.perfilUsuario['perfilPessoal'];
    if ( _perfilPessoal == null) {
      //console.log('id: ' + _idUsuario);
      //console.log(value);
    }
    else {
      //console.log(_perfilPessoal);
      //console.log(Object.keys(_perfilPessoal));
      for (let i = 0; i < (Object.keys(_perfilPessoal).length); i++) {
        let field_name = Object.keys(_perfilPessoal)[i];
        let field_value = _perfilPessoal[field_name];
        //console.log('_perfilPessoal[i]' + i);
        let resultt = i +  ' campo: ' +  field_name + ' / valor: ' + field_value;
      }
    }
    */


    let _body = this.montarBodyPerfilPessoal(value);
    if ((_idUsuario != null) && (_body != null)) {
      if(this.perfilUsuario['perfilPessoal'] != null ) {
        this.pessoalService.modificarPerfilPessoal(_idUsuario,  _body)
        .subscribe(Response => {
          this.gravaDadosPresentToast();
          this.irParaTelaAnterior();
        },
        error => {
          //console.log(error); 
        });
      }
      else {
        this.pessoalService.adicionarPerfilPessoal(_idUsuario,  _body)
        .subscribe(Response => {
          this.gravaDadosPresentToast();
          this.irParaTelaAnterior();
        },
        error => {
          //console.log(error); 
        });
      }

    }
  }

  async gravaDadosPresentToast() {
    const toast = await this.toastController.create({
      message: 'Dados gravados com sucesso.',
      duration: 2000
    });
    toast.present();
  }  

  montarBodyPerfilPessoal(value: any) : any {
    let _value = { 
      //"id"
      //"created"
      "nome": value.nome,
      "tipoPerfil": "PESSOAL",
      //"contatos"
      //"privacidade"
      "telefone": value.telefone,
      //"residencia"
      //"trabalho"
      "nascimento": value.nascimento,
      "sexo": value.sexo,
      "praticaEsporte": value.praticaEsporte,
      "doadorOrgao": value.doadorOrgao,
      "doadorSangue": value.doadorSangue,
      "tipoSangue": value.tipoSangue,
      "altura": value.altura,
      "peso": value.peso,
      //"dependentes"
      //"doencas"
      //"alergias"
      //"medicamentos"
      //"cirurgias"
      //"contatoEmergencia"
      //"protocolosEmergencias"
      //"profissionais"
      //"convenios"
      //"drogas"
      //"acidentes"
      //"condicoesEspeciais"
      "rg": value.rg,
      "cpf": value.cpf
    };
    return _value;
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
            let _idUsuario = this.perfilUsuario['id'];
            console.log(_idUsuario);
            if (_idUsuario != null) {
              this.pessoalService.excluirPerfilPessoal(_idUsuario)
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

  irParaProximaTela() {
    this.navCtrl.navigateForward('pessoal-doencas');
  }


}
