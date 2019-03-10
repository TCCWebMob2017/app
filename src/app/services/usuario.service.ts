import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http    : HttpClient, 
              private storage : StorageService) { }

  getLoggedInUser() {   
    let url =  `${API_CONFIG.baseUrl}/api/v1/usuario`;
    return this.http.get<any>(url);
  }

  enviarDadosDoStorageParaApi() : boolean {

    let _usuario          = this.storage.getLocalProfile();
    let _idUsuario        = _usuario['id'];
    let _body             = _usuario['perfilPessoal'];
    let _idPerfilPessoal  = _usuario['perfilPessoal']['id'];

    if ((_idUsuario != null) && (_body != null)) {
      if(_idPerfilPessoal != null ) {
        this.modificarPerfilPessoal(_idUsuario,  _body)
        .subscribe(Response => {
          return true;
        },
        error => {
          return false;
        });
      }
      else {
        this.adicionarPerfilPessoal(_idUsuario,  _body)
        .subscribe(Response => {
          _usuario['perfilPessoal']['id'] = JSON.parse(Response['body'])['perfilPessoal']['id']; 
          this.storage.setUsuarioDados(_usuario);
          return true;
        },
        error => {
          return false;
        });
      }
    }
    else {
      return false;
    }
  }

  adicionarPerfilPessoal(id: string, body: any) {
    let url = API_CONFIG.baseUrl + '/api/v1/usuario/' + id + '/perfil/pessoal';
    return this.http.post(url, body, { observe: 'response', responseType: 'text'});
  }

  modificarPerfilPessoal(id: string, body: any) {
    let url = API_CONFIG.baseUrl + '/api/v1/usuario/' + id + '/perfil/pessoal';
    return this.http.put(url, body, { observe: 'response', responseType: 'text'});
  }

  excluirPerfilPessoal(id: string) {
    let url = API_CONFIG.baseUrl + '/api/v1/usuario/' + id + '/perfil/pessoal';
    return this.http.delete(url, { observe: 'response', responseType: 'text'});
  }


}
