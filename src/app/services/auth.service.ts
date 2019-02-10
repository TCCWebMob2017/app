import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from 'src/config/api.config';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly jwtTokenName = 'jwt_token';
  private authUser = new ReplaySubject<any>(1);

  constructor(private http : HttpClient) { }

  authenticate(creds : CredenciaisDTO) {
    let url = `${API_CONFIG.baseUr}/login`;
    
    console.log('authservice.ts -> ' + url);

    if((creds.email + "" == "") || (creds.password+"" == "")) {
      creds.email = "afelix@softquim.com.br";
      creds.password = "123456";
    }
    console.log(creds);


    var headers = new Headers();


    //var result = await this.http.post<any>(url, creds).toPromise();
    //var result = this.http.post<any>(url, creds).toPromise();
    //console.log(result);

    return this.http.post(
      url,
      creds, 
      { 
        observe: 'response',
        responseType: 'text'
      });
    

    //this.http.get(url,{}).pipe(map((res: Response) =>{
    //  var data = res.json();    



      //login(values: any): Observable<string> {
      //  return this.httpClient.post(`${environment.serverURL}/login`, values, 
      //{responseType: 'text'})
      //    .pipe(tap(jwt => this.handleJwtResponse(jwt)));
      //}
  }


  authenticat2(values: any): Observable<string> {

    let url = `${API_CONFIG.baseUr}/login`;
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

    let url = `${API_CONFIG.baseUr}/login`;
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
      let url = `${API_CONFIG.baseUr}/login`;
      let headers = new HttpHeaders ({'Content-Type':'application/json'});


      console.log("hhheaders");
      console.log(headers);
  
      //this.http.post(url, pessoal, {headers : headers}).toPromise();



    return this.http.post<any>(`${API_CONFIG.baseUr}/login`, { email, password })
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
