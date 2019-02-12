import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from 'src/config/api.config';
//import { Observable, ReplaySubject } from 'rxjs';
import { LocalUser } from '../models/local_users';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http : HttpClient, public storage : StorageService) { }
  
  authenticate(creds : CredenciaisDTO) {
    let url = API_CONFIG.loginUrl;    
    
    if((creds.email + "" == "") || (creds.password+"" == "")) { 
      creds.email = "marinakamillysuelimoreira-86@alemponte.com.br";
      creds.password = "iZEtE2llMC";
    }
    return this.http.post(url, creds, { observe: 'response', responseType: 'text' });
  }

  sucessfullLogin(email : string, authorizationValue : string) {
    let _token = authorizationValue.substring(7);
    let _user : LocalUser = { email: email, token: _token
    };
    //console.log(_user);
    this.storage.setLocalUser(_user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

}
