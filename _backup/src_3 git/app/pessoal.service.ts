import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoalService {
  private API_URL = 'https://bioup.herokuapp.com/api/v1/'

  constructor(private http : HttpClient) { }

  getPessoalById(id : string){
    let url = this.API_URL + 'pessoal/' + id;
    return this.http.get(url).toPromise();
  }

  postPessoal(any : any){
    let url = 'https://bioup.herokuapp.com/api/v1/pessoal/';
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //this.http.post(url, pessoal, {headers : headers}).toPromise();
  }

  putPessoal(any : any){
    let url = 'https://bioup.herokuapp.com/api/v1/pessoal/';
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //this.http.put(url, pessoal, {headers : headers}).toPromise();
  }


  deletePessoal(id : string){
    let url = 'https://bioup.herokuapp.com/api/v1/pessoal/' + id;

    return this.http.delete(url).toPromise();
  }

}
