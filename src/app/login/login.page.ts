import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';

import { first } from 'rxjs/operators';
import {finalize} from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

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
    public auth : AuthService,
    private storage : StorageService) { }

  ngOnInit() {
    this.storage.clearLocalUser();
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
        this.auth.sucessfullLogin(Response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('pessoal');
      },
      error => {
        console.log(error);
      }
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
