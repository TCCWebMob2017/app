import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {

  public medicamentos_all: any;
  public medicamentos: any;
  searchTerm: string = '';


  constructor( public pessoalService: PessoalService ) { 
  }

  ngOnInit() {

    this.pessoalService.getMedicamentosAll()
    .subscribe(Response => {
      this.medicamentos_all = Response;
      this.medicamentos     = Response;
    },
    error => {
      console.log(error);
    });

  }

  setFilteredItems(ev: any) {
    let val = ev.target.value;
    this.medicamentos = this.pessoalService.filterItems(this.medicamentos_all, val);
  }


/*


  setFilteredLocations(ev: any){
    let val = ev.target.value;

console.log(val);

    if (val && val.trim() !== '') {
      return this.medicamentos.filterLocations(val);
    }

  }  
*/



}

