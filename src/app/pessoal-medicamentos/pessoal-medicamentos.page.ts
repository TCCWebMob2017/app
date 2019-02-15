import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {

  //registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) { }

  //https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic
  //http://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
  //https://github.com/paulstelzer



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //username: new FormControl(''),
      firstName: ['Alcenir Felix', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: new FormControl(''),
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

  onClickLogIn(credentials) {
    alert('Onnnnnnnnnnnnnn');
    console.log('form submitted', credentials);
  }  


    // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    console.log('submit --------->');
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
}  
  
}

