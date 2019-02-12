import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements OnInit {

  fichaMedica: any;
  constructor(private pessoalService : PessoalService) { }

  ngOnInit() {
    this.buscaFichaMedica();
  }

  buscaFichaMedica() {
    this.pessoalService.getLoggedInUser()
    .subscribe(Response => {
    this.fichaMedica = Response;       
      console.log(this.fichaMedica);
    },
    error => { }
    );
  }

}
