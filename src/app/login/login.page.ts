import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';

import { first } from 'rxjs/operators';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds : CredenciaisDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl : NavController, 
    public menu : MenuController,
    public auth : AuthService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.menu.enable(false);  //this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  login() {

    this.auth.authenticate(this.creds)
      .subscribe(Response => {
        console.log(Response);
        console.log(Response.headers.get('Authorization'));
        //alert(Response.headers.get('Authorization'));
        //this.navCtrl.navigateRoot('pessoal-todos');
      },
      error => {}
      )

    /*
    this.auth.userAuthentication(this.creds);
    console.log(Response);
    */

  };

  
  
    // //this.navCtrl.navigateRoot('pessoal');
    // //this.navCtrl.navigateForward('pessoal');
  

  signup() { };

}
