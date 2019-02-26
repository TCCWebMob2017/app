import { PessoalService } from './../services/pessoal.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoal-medicamentos-add',
  templateUrl: './pessoal-medicamentos-add.page.html',
  styleUrls: ['./pessoal-medicamentos-add.page.scss'],
})
export class PessoalMedicamentosAddPage implements OnInit {

  public medicamentos_all: any;
  public medicamentos: any;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, 
              public pessoalService: PessoalService) { }

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

  ionViewDidLoad(){
   console.log('ionViewDidLoad ......');
  }

  setFilteredItems(ev: any) {
    let val = ev.target.value;
    this.medicamentos = this.pessoalService.filterItems(this.medicamentos_all, val);
  }

  addMedicamento() {
    this.navCtrl.navigateForward('pessoal-medicamentos-add');
  }  

  selecionarMedicamento(value:any) {
    if (value!= null) {
      console.log(value);
      this.navCtrl.navigateBack('pessoal-medicamentos');
    }
  }
}
