import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl : NavController, public menu : MenuController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.menu.enable(false);  //this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  login() {
    this.navCtrl.navigateRoot('pessoal');
    //this.navCtrl.navigateForward('pessoal');
  }

  signup() { };

}
