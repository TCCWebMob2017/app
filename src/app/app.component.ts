import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Pessoal', url: '/pessoal', icon: 'finger-print' },
    //{ title: 'Pessoal', url: '/pessoal', icon: 'contact' },
    //{ title: 'List', url: '/list', icon: 'list' },
    { title: 'Ficha médica', url: '/ficha-medica', icon: 'medical' },
    { title: 'Logout', url: '/login', icon: 'log-out' }
    //{ title: 'Logout', component: ''}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
    //public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Logout':
      this.auth.logout();
      //this.nav.setRoot('HomePage');
      //this.navCtrl.navigateRoot('pessoal');
      break;

      default:
      //this.nav.setRoot(page.component);
    }
  }
  
}
