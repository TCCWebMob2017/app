import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { STORAGE_KEY } from 'src/config/storagekeys.config';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements OnInit {
  public avatarBlank: string;
  public fichaMedica: any;
  constructor(private pessoalService: PessoalService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.fichaMedica = this.storage.getLocalUsuarioDados();
    this.avatarBlank = STORAGE_KEY.avatarBlank;
    if (this.fichaMedica == null) {
      this.buscaFichaMedica();
    }
  }

  buscaFichaMedica() {
    this.pessoalService.getLoggedInUser()
      .subscribe(Response => {
        this.fichaMedica = Response;
      },
        error => { }
      );
  }

}
