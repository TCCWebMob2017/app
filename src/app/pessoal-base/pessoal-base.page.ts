import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal-base',
  templateUrl: './pessoal-base.page.html',
  styleUrls: ['./pessoal-base.page.scss'],
})
export class PessoalBasePage implements OnInit {

  formGroup: FormGroup;
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
    this.formGroup = this.formBuilder.group({
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
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    //if (this.loginForm.invalid) {
    //  return;
    //}
    console.log('submit --------->');
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroup.value))
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


}
