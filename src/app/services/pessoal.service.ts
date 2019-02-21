import { PessoalDTO } from './../models/pessoal.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PessoalService {

  constructor(private http : HttpClient, private storage : StorageService) { }

  findAll() : Observable<PessoalDTO[]> {
    //let url =  `${API_CONFIG.baseUr}` + 'usuario/pessoal'; 
    let url =  `${API_CONFIG.baseUrl}` + 'pessoal/all';

    console.log(url);
    return this.http.get<PessoalDTO[]>(url);

    //https://bioup.herokuapp.com/api/v1/pessoal/all
    //https://api-qlife.herokuapp.com/api/v1/usuario/pessoal

  }


  getLoggedInUser() {
    let url =  `${API_CONFIG.baseUrl}` + '/api/v1/usuario';
    return this.http.get<any>(url);
  }

  findById(id : string) : Observable<PessoalDTO> {
    let url =  `${API_CONFIG.baseUrl}/api/v1/pessoal/${id}`;
    /*
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token });
    */

    /* return this.http.get<PessoaDTO>(url, {'headers': authHeader});  */
    return this.http.get<PessoalDTO>(url); 
  }

  findByEmail() {

  }

  getImageFromBucket(id : string) : Observable<any> {
    let url =  `${API_CONFIG.baseUrl}/api/v1/pessoal/${id}/avatar/`;
    return this.http.get(url, {responseType : 'blob'});
  }
  

}
