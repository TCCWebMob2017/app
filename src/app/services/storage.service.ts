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

  getperfilPessoal(): any {
    let _usuario = this.getLocalProfile();
    if (_usuario == null) {
      return null;
    }
    else {
      let _perfilPessoal = _usuario['perfilPessoal'];
      return _perfilPessoal;
    }
  }


}