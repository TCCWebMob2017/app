import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';
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

  public userOnLine: any;

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
        this.auth.sucessfullLogin(this.creds.email, Response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('pessoal');
      },
      error => {
        console.log(error);
      }
    )
  };


  signup() { 
    //this.navCtrl.navigateRoot('signup');
    this.navCtrl.navigateForward('signup');
  };

  sobre() {
    this.navCtrl.navigateForward('sobre');
  }

}
