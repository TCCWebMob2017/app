import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from 'src/config/api.config';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import {tap} from 'rxjs/operators';
import { LocalUser } from '../models/local_users';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //jwtHelper: JwtHelper = new JwtHelper();
  //jwtHelper: JwtHelper;
  
  private readonly jwtTokenName = 'jwt_token';
  private authUser = new ReplaySubject<any>(1);

  constructor(private http : HttpClient, public storage : StorageService) { }

  
  authenticate(creds : CredenciaisDTO) {
    let url = API_CONFIG.loginUrl;    
    if((creds.email + "" == "") || (creds.password+"" == "")) {
      
      //creds.email = "afelix@softquim.com.br";
      creds.email = "marinakamillysuelimoreira-86@alemponte.com.br";
      //creds.password = "123456";
      creds.password = "iZEtE2llMC";
      
    }    
    //var headers = new Headers();
    return this.http.post(
      url,
      creds, 
      { 
        observe: 'response',
        responseType: 'text'
      });
  }

  sucessfullLogin(email : string, authorizationValue : string) {

    console.log(authorizationValue) ;
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(email);


    let _token = authorizationValue.substring(7);
    let _user : LocalUser = {
      token: _token,
      id: "edaa50c1-8301-4f71-b0d2-8ed35dfc3dbf",
      email: email
      //https://api-qlife.herokuapp.com/api/v1/usuario

//https://api-qlife.herokuapp.com/api/v1/usuario/

    };
    this.storage.setLocalUser(_user);
  }


  logout() {
    this.storage.setLocalUser(null);
  }





  authenticat2(values: any): Observable<string> {

    let url = API_CONFIG.loginUrl;
    console.log('authenticat2...: ' + url);
    values.email = "afelix@softquim.com.br";
    values.password = "123456";
    console.log(values);

    return this.http.post(url, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  private handleJwtResponse(jwt: string): string {
    localStorage.setItem(this.jwtTokenName, jwt);
    this.authUser.next(jwt);

    console.log('handleJwtResponse..xxxxx 1.');
    console.log(Response);
    console.log('handleJwtResponse..xxxxx 2.');
    //console.log(jwt);
    //console.log(this.authUser);

    return jwt;
  }  

  userAuthentication(creds : CredenciaisDTO) {

    let url = API_CONFIG.loginUrl;
    creds.email = "afelix@softquim.com.br";
    creds.password = "123456";    

    var base64Auth = btoa("particle:particle");
    var reqHeader = new HttpHeaders();

    reqHeader = reqHeader.append('Content-Type','application/x-www-urlencoded');
    reqHeader = reqHeader.append('particle','particle');
    reqHeader = reqHeader.append('Authorization','Basic '+base64Auth);
    
    console.log(reqHeader)
    /*
    return this.http.post(url, creds, {headers: reqHeader});
    console.log(Response);
    console.log(Headers);
    */

  }



  
  login2(email: string, password: string) {

    email = "afelix@softquim.com.br";
    password ="123456";

    console.log("E-mail: " + email);
    console.log("Senha: " + password);


    //postPessoal(any : any){
      let url = API_CONFIG.loginUrl;
      let headers = new HttpHeaders ({'Content-Type':'application/json'});


      console.log("hhheaders");
      console.log(headers);
  
      //this.http.post(url, pessoal, {headers : headers}).toPromise();



    return this.http.post<any>(API_CONFIG.loginUrl, { email, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response

            console.log("useR; " + user);
            console.log("Response:: " + Response);

            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            console.log(user);
            return user;
        }));
  }


}
