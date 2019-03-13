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

  setUsuarioDados(obj : any) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEY.localProfile);
    }
    else {
      localStorage.setItem(STORAGE_KEY.localProfile, JSON.stringify(obj));
    }
  }

  getLocalProfile() : any {
    let profile = localStorage.getItem(STORAGE_KEY.localProfile);
    if(profile == null) {
      return null;
    }
    else {
      return JSON.parse(profile);
    }
  }

  getPerfilPessoal(): any {
    let _usuario = this.getLocalProfile();
    if (_usuario == null) {
      return null;
    }
    else {
      let _perfilPessoal = _usuario['perfilPessoal'];
      return _perfilPessoal;
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
    let _usuario = this.getLocalProfile();
    console.log(_usuario);
    if (_usuario == null) { 
      return; 
    }
    let _perfilPessoal = _usuario['perfilPessoal'];
    if (_perfilPessoal == null) { 
      return; 
    }

    _perfilPessoal['medicamentos'] = value;

    _usuario['perfilPessoal'] = _perfilPessoal;
    this.setUsuarioDados(_usuario);
  }


}