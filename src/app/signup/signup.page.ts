import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgModel } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  usernameModel: NgModel;

  constructor(public navCtrl: NavController,
              public auth : AuthService,
              //private readonly authService: AuthService,
              //private readonly loadingCtrl: LoadingController,
              //private readonly toastCtrl: ToastController,
              //public formBuilder: FormBuilder,
              public alertCtrl: AlertController
              ) { 

  }


  async signup(value: any) {

    this.auth.signup(value)
      .subscribe(Response => {
        //this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('login');
        //console.log(Response);
      },
      error => {
        console.log(error);
      }
      )


    //const loading = await this.loadingCtrl.create({
    //  spinner: 'bubbles',
    //  message: 'Signing up ...'
    //});

    //loading.present();

    /*
    this.authService
      .signup(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        jwt => this.showSuccesToast(jwt),
        err => this.handleError(err));
        */
  }  

  ngOnInit() {
  }

}
