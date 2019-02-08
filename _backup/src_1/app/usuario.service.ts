import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = 'https://bioup.herokuapp.com/api/v1/'

  constructor(private http : HttpClient) { }

  getUsuarioById(id : string) {
    let url = this.API_URL + 'usuario/' + id;
    return this.http.get(url).toPromise();
  }

}
