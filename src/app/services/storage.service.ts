import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local_users';
import { STORAGE_KEY } from 'src/config/storagekeys.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEY.localUsuarioCredenciais);
    if(usr == null) {
      return null;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj : LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEY.localUsuarioCredenciais);
    }
    else {
      localStorage.setItem(STORAGE_KEY.localUsuarioCredenciais, JSON.stringify(obj));
    }
  }

  limparUsuarioCredenciais() {
    localStorage.removeItem(STORAGE_KEY.localUsuarioCredenciais);
  }

  limparUsuarioDados() {
    localStorage.removeItem(STORAGE_KEY.localUsuarioDados);
  }

  getLocalUsuarioDadosB() : any {
    let _profile = localStorage.getItem(STORAGE_KEY.localUsuarioDados);
    if(_profile == null) {
      return null;
    }
    else {
      return JSON.parse(_profile);
    }
  }

  getLocalUsuarioPessoal() : any {
    let profile = localStorage.getItem(STORAGE_KEY.localUsuarioPessoal);
    if(profile == null) {
      return null;
    }
    else {
      return JSON.parse(profile);
    }
  }

  setLocalUsuarioDados(obj : any) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEY.localUsuarioPessoal);
    }
    else {
      localStorage.setItem(STORAGE_KEY.localUsuarioPessoal, JSON.stringify(obj));
    }
  }

  getLocalParametros() : any {
    let _parametros = localStorage.getItem(STORAGE_KEY.localParametros);
    if(_parametros == null) {
      return null;
    }
    else {
      return JSON.parse(_parametros);
    }
  }

  setLocalParametros(chave : string, valor : any) {
    let _parametros = this.getLocalParametros();
    if (_parametros == null) { _parametros = { }; }
    if(chave == null && valor == null) {
      //localStorage.removeItem(STORAGE_KEY.localParametros);
    }
    else {
      _parametros[chave] = valor;
      localStorage.setItem(STORAGE_KEY.localParametros, JSON.stringify(_parametros));
    }
  }
  
  limparUsuarioPerfilPessoal() {
    localStorage.removeItem(STORAGE_KEY.localUsuarioPessoal);
  }

  getPerfilPessoal(): any {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario == null) {
      return null;
    }
    else {
      let _perfilPessoal = _usuario['perfilPessoal'];
      return _perfilPessoal;
    }
  }

  clearPerfilPessoal() {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario != null) {
      _usuario['perfilPessoal'] = null;
      this.setLocalUsuarioDados(_usuario);
    }
  }

  getMedicamentos(): any {
    let _perfilPessoal = this.getPerfilPessoal();
    if (_perfilPessoal == null) {
      return null;
    }
    else {
      let _medicamentos = _perfilPessoal['medicamentos'];
      return _medicamentos;
    }
  }

  addMedicamentos(obj : any) {
    let _medicamentos = this.getMedicamentos();
    if (_medicamentos == null) { _medicamentos = []; }
    if (obj != null) { 
      _medicamentos.push(obj); 
    }
    this.setMedicamentos(_medicamentos);
  }

  modificarMedicamento(index : number, obj : any) {
    let _medicamentos = this.getMedicamentos();
    if (_medicamentos == null) { _medicamentos = []; }
    if (obj != null) { _medicamentos[index] = obj; }
    this.setMedicamentos(_medicamentos);
  }

  removeMedicamento(index : number) {
    let _medicamentos = this.getMedicamentos();
    _medicamentos.splice(index, 1);
    this.setMedicamentos(_medicamentos);
  }

  setMedicamentos(value : any) {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario == null) { 
      return;
    }
    let _perfilPessoal = _usuario['perfilPessoal'];
    if (_perfilPessoal == null) {
      return;
    }
    _perfilPessoal['medicamentos'] = value;
    _usuario['perfilPessoal'] = _perfilPessoal;
    this.setLocalUsuarioDados(_usuario);
  }

  addRegistroAhLista(obj : any, nomeObj : string) {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario != null) {
      let _perfilPessoal = _usuario['perfilPessoal'];
      if (_perfilPessoal != null) {
        let _listaObj = _perfilPessoal[nomeObj];
        if (_listaObj == null) { 
          _listaObj = [];
        }
        if (obj != null) {
          _listaObj.push(obj);
          _perfilPessoal[nomeObj] = _listaObj;
          _usuario['perfilPessoal'] = _perfilPessoal;
          this.setLocalUsuarioDados(_usuario);
        }
      }  
    }
  }

  removeRegistroDaLista(index : number, nome_obj : string) {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario != null) {
      let _perfilPessoal = _usuario['perfilPessoal'];
      if (_perfilPessoal != null) {
        let _listaObj = _perfilPessoal[nome_obj];
        if (_listaObj != null) {
          _listaObj.splice(index, 1);
          _perfilPessoal[nome_obj] = _listaObj;
          _usuario['perfilPessoal'] = _perfilPessoal;
          this.setLocalUsuarioDados(_usuario);
        }
      }
    }
  }

  modificarRegistroNaLista(index : number, obj : any, nome_obj : string) {
    let _usuario = this.getLocalUsuarioPessoal();
    if (_usuario != null) {
      let _perfilPessoal = _usuario['perfilPessoal'];
      if (_perfilPessoal != null) {
        let _listaObj = _perfilPessoal[nome_obj];
        if (_listaObj == null) {
          _listaObj = [];
        }
        if (obj != null) {
          _listaObj[index] = obj;
          _perfilPessoal[nome_obj] = _listaObj;
          _usuario['perfilPessoal'] = _perfilPessoal;
          this.setLocalUsuarioDados(_usuario);
        }
      }
    }
  }

}