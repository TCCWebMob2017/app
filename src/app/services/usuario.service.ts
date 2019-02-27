import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient, private storage : StorageService) { }

  getLoggedInUser() {   
    let url =  `${API_CONFIG.baseUrl}/api/v1/usuario`;
    return this.http.get<any>(url);
  }


}
