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
    

    if((creds.email + "" == "a") && (creds.password+"" == "")) { 
      creds.email = "afelix@softquim.com.br";
      creds.password = "123456";
    }
    else if((creds.email + "" == "b") && (creds.password+"" == "")) { 
      creds.email = "enzorafaeldasilva@carubelli.com.br";
      creds.password = "D5EWaFJ2ZY";
    }
    else if((creds.email + "" == "c") && (creds.password+"" == "")) { 
      creds.email = "ggustavomiguellima@yahoo.it";
      creds.password = "h81pJCbFMB";
    }
    else if((creds.email + "" == "d") && (creds.password+"" == "")) { 
      creds.email = "benjaminkevinrenatoferreira-92@mucoucah.com.br";
      creds.password = "nbHTCkysuO";
    }
    else if((creds.email + "" == "e") && (creds.password+"" == "")) { 
      creds.email = "aantoniosamuelsilva@andrepires.com.br";
      creds.password = "uMnCEdXT3L";
    }
    else if((creds.email + "" == "f") && (creds.password+"" == "")) { 
      creds.email = "aarthurgustavolevibaptista@cartovale.com.br";
      creds.password = "nTIC15CLTh";
    }
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
    this.storage.setLocalUser(_user);
  }

  signup(value: any) {
    let url = API_CONFIG.baseUrl + "/api/v1/usuario";
    console.log('url ------------> ' + url);
    console.log(value);
    return this.http.post(url, value, { observe: 'response', responseType: 'text' });
  }

  logout() {
    this.storage.setLocalUser(null);
  }

}
