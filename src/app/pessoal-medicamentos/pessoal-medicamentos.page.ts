import { PessoalService } from './../services/pessoal.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal-medicamentos',
  templateUrl: './pessoal-medicamentos.page.html',
  styleUrls: ['./pessoal-medicamentos.page.scss'],
})
export class PessoalMedicamentosPage implements OnInit {

  public medicamentos: any;
  
  constructor(public navCtrl: NavController, 
              public pessoalService: PessoalService) { }

  ngOnInit() {

    this.pessoalService.getMedicamentosAll()
    .subscribe(Response => {
        this.medicamentos     = Response;
    },
    error => {
      console.log(error);
    });

  }

  addMedicamento() {
    this.navCtrl.navigateForward('pessoal-medicamentos-add');
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

