import { PessoaDTO } from './../models/pessoal.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoalService {

  constructor(private http : HttpClient) { }

  findAll() : Observable<PessoaDTO[]> {
    //let url =  `${API_CONFIG.baseUr}` + 'usuario/pessoal'; 
    let url =  `${API_CONFIG.baseUr}` + 'pessoal/all'; 

    console.log(url);
    return this.http.get<PessoaDTO[]>(url);

    //https://bioup.herokuapp.com/api/v1/pessoal/all
    //https://api-qlife.herokuapp.com/api/v1/usuario/pessoal

  }

}
