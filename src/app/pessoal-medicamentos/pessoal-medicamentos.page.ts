import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  position: string

  customAlertOptions: any = {
    header: 'Tipo sanguíneo',
    //subHeader: 'Subheaderrrr',
    //message: 'messageeeeeee',
    translucent: false
  };

  customPopoverOptions: any = {
    header: 'Tipo sanguíneo',
    //subHeader: 'Tipo sanguíneo',
    //message: 'Selecione o seu tipo sanguíneo'
  };  


  minSelectableDate = '1900-01-01';
  maxSelectableDate;
  myDate;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) { 
      this.position = "floating";
      //this.position = "fixed";

      this.myDate = new Date();
      this.maxSelectableDate = this.formatDate(this.myDate);
  }

  //https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic
  //http://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
  //https://github.com/paulstelzer

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
    this.loginForm = this.formBuilder.group({
      //username: new FormControl(''),
      nome:       ['Alcenir Felix de Carvalho Toledo', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      peso:       ['', [Validators.required, Validators.min(10)]],
      altura:     ['', [Validators.required, Validators.min(10)]],
      nascimento: ['', [Validators.required]],
      tipoSangue: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
      //email:      ['', [Validators.required, Validators.email]],
      //username:   ['', [Validators.required, Validators.minLength(10)]],
      //password: new FormControl(''),
    }); 

    /* 
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });    
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
  };  

  onClickLogIn(credentials) {
    alert('Onnnnnnnnnnnnnn');
    console.log('form submitted', credentials);
  }  


    // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    //if (this.loginForm.invalid) {
    //  return;
    //}

    console.log('submit --------->');
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }  
  
}

