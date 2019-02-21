import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { perfilUsuario } from '../models/perfilUsuario';
import { perfilPessoal } from '../models/perfilPessoal';
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

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    public pessoalService: PessoalService,
    private formBuilder: FormBuilder,
    private modalController: ModalController) { 
      
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
    console.log(this.perfilUsuario);

    let _nome: string;
    
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
    
    var _perfilPessoal: perfilPessoal;
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
        //console.log(resultt);
        //console.log(_perfilPessoal[resultt]);

      }
    }

    let _body = this.perfilUsuario;

    _body['perfilPessoal'] = value;

    console.log('_body:::::::::');
    console.log(_body);

    if (_idUsuario != null &&  _body != null) {
      this.pessoalService.adicionarPerfilPessoal(_idUsuario, _body )
      .subscribe(Response => {
        console.log(Response);
        // this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
      },
      error => {
        console.log(error); 
      });
    }

    // https://api-qlife.herokuapp.com/api/v1/usuario/21e78c4d-34aa-4816-859d-98a7a3ea6f29/perfil/pessoal
    // https://api-qlife.herokuapp.com/api/v1/usuario/21e78c4d-34aa-4816-859d-98a7a3ea6f29/perfil/pessoal



    /* 
    
    {
    "id": "21e78c4d-34aa-4816-859d-98a7a3ea6f29",
    "created": "08/02/2019 19:52:48",
    "nome": "Alcenir Felix de Carvalho Toledo",
    "email": "afelix@softquim.com.br",
    "password": "$2a$10$NPz9Go0P5RjTVrb95Lr1ze/kRVCY/2bmG3f9Wxywl155TmUF7NX82",
    "tefefone": "12997792854",
    "cpf": "19915457898",
    "rg": "255212963",
    "enabled": false,
    "tipos": [
        "PACIENTE"
    ],
    "perfilPessoal": {
        "id": "960e0242-6426-4413-a559-d815821c17fc",
        "created": "20/02/2019 20:59:09",
        "nome": "Alcenir Felix de Carvalho Toledo",
        "tipoPerfil": "PESSOAL",
        "contatos": null,
        "privacidade": null,
        "telefone": "12997792854",
        "residencia": {
            "nomeLocal": null,
            "logradouro": "Avenida Godoy Neto",
            "bairro": "Olaria",
            "cidade": "Lorena",
            "estado": "SP",
            "numero": "278",
            "cep": "12607-060"
        },
        "trabalho": null,
        "nascimento": "04/12/1989",
        "sexo": "M",
        "praticaEsporte": false,
        "doadorOrgao": true,
        "doadorSangue": false,
        "tipoSangue": "A-",
        "altura": 1.89,
        "peso": 83,
        "dependentes": [],
        "doencas": null,
        "alergias": null,
        "medicamentos": null,
        "cirurgias": null,
        "contatoEmergencia": null,
        "protocolosEmergencias": null,
        "profissionais": null,
        "convenios": null,
        "drogas": null,
        "acidentes": null,
        "condicoesEspeciais": null,
        "rg": "255212963",
        "cpf": "19915457898"
    },
    "perfilProfissional": null,
    "perfisInstituicoes": null
}

    
    */


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


  irParaTelaAnterior() {
    //this.navCtrl.navigateBack('pessoal');
  }

  irParaProximaTela() {
    this.navCtrl.navigateForward('pessoal-doencas');
  }


}
