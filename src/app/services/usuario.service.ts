import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { UsuarioDTO } from '../models/usuario';

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

  buscarDadosUsuarioNaApiParaStorage() {
    let _localUser = this.storage.getLocalUser();
    if(_localUser && _localUser.email) {
      this.getLoggedInUser()
      .subscribe(Response => {
        let _usuario : UsuarioDTO = Response;
        this.storage.setLocalUsuarioDados(_usuario);
      },
      error => { 
        //if (error.status == 403) {
        //  this.navCtrl.navigateRoot('login');
        //}
      })
    }
    //else { this.navCtrl.navigateRoot('login'); }
  };

  enviarDadosDoStorageParaApi() : boolean {

    let _usuario          = this.storage.getLocalUsuarioDados();
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
          this.storage.setLocalUsuarioDados(_usuario);
          
          this.modificarPerfilPessoal(_idUsuario,  _body)
          .subscribe(Response => {
            return true;
          },
          error => { return false; }); 
          //return true;
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

  modificarUsuarioDados(body: any) {
    let id = body['id'];
    let url = API_CONFIG.baseUrl + '/api/v1/usuario/' + id;
    return this.http.put(url, body, { observe: 'response', responseType: 'text'});
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
