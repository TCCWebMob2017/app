import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PessoalService } from './services/pessoal.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PessoalService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
