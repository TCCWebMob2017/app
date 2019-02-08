import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
  

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from './home/home.page';
//import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
//import {AuthGuard} from './auth.guard';


export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [AppComponent, HomePage, LoginPage, SignupPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      //whitelistedDomains: environment.whitelistedDomains
      }
    }),
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
    //RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
