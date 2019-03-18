import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements OnInit {

  fichaMedica: any;
  constructor(private pessoalService : PessoalService,
              private storage: StorageService
                      ) { }

  ngOnInit() {

    this.fichaMedica = this.storage.getLocalUsuarioPessoal();
    if ( this.fichaMedica == null) {
      this.buscaFichaMedica();
    }


    console.log(this.fichaMedica);
    if (this.fichaMedica.perfilPessoal == null) {
      console.log('Nullll xxxxxxxxxxxx');
    }
    else {
      console.log('Not Nullll xxxxxxxx');
    }
    //console.log(this.fichaMedica.perfilPessoal.medicamentos);
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
