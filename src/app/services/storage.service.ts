import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local_users';
import { STORAGE_KEY } from 'src/config/storagekeys.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEY.localUser);
    if(usr == null) {
      return null;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj : LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEY.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj));
    }
  }

  clearLocalUser() {
    localStorage.removeItem(STORAGE_KEY.localUser);
  }


  getLocalUsuarioDados() : any {
    let profile = localStorage.getItem(STORAGE_KEY.localProfile);
    if(profile == null) {
      return null;
    }
    else {
      return JSON.parse(profile);
    }
  }

  setLocalUsuarioDados(obj : any) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEY.localProfile);
    }
    else {
      localStorage.setItem(STORAGE_KEY.localProfile, JSON.stringify(obj));
    }
  }

  clearLocalUsuarioDados() {
    localStorage.removeItem(STORAGE_KEY.localProfile);
  }

  getPerfilPessoal(): any {
    let _usuario = this.getLocalUsuarioDados();
    if (_usuario == null) {
      return null;
    }
    else {
      let _perfilPessoal = _usuario['perfilPessoal'];
      return _perfilPessoal;
    }
  }

  clearPerfilPessoal() {
    let _usuario = this.getLocalUsuarioDados();
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
    console.log(_medicamentos);
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
    let _usuario = this.getLocalUsuarioDados();
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
    let _usuario = this.getLocalUsuarioDados();
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
    console.log(_usuario);
  }

  removeRegistroDaLista(index : number, nome_obj : string) {
    let _usuario = this.getLocalUsuarioDados();
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
    let _usuario = this.getLocalUsuarioDados();
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