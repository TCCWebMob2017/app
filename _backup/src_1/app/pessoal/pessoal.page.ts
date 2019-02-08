import { Pessoal } from './../models/pessoal';
import { PessoalService } from './../pessoal.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  result : any;
  pessoal : Pessoal = new Pessoal();
  text_disabled: boolean = true;

  

  //result : Pessoal;
  //constructor() { }
  constructor(private pessoalService : PessoalService, public menuCtrl : MenuController, public navCtrl : NavController,
              private router: Router) { 
    //  this.menuCtrl.enable(true);
    
  }

  ngOnInit() {
  }

  gotoPessoalDependentes(){
    //this.navCtrl.push('list');
    //this.router.navigateByUrl(`tabs/(users:user-detail/${user.email}`);
    this.router.navigateByUrl('pessoal-dependentes');
    //this.router.navigate(['/detail'])

  }

  gotoPessoalDoencas(){
    this.router.navigateByUrl('pessoal-doencas');
  }

  pessoaGet(){
    // Chama tela de aguarde
    //this.pessoalService.getPessoalById('3eefcba7-eeda-4977-ac58-7ff7937b5623')
    this.pessoalService.getPessoalById('edaa50c1-8301-4f71-b0d2-8ed35dfc3dbf')
   
    .then((response)=>{
      this.result = JSON.stringify(response);
      this.pessoal = JSON.parse(JSON.stringify(response));

      // Fecha tela de aguarde
    })

    .catch((response)=>{
      //this.result = JSON.stringify(response);
      // Fecha tela de aguarde
    });
    //alert('get');
  }


  consoleLogHome(){
    console.log('home....');
  };

  pessoaPost(){
    alert('Post');
  }

  pessoaPut(){
    alert('Put');
  }

  pessoaDelete(){
    alert('Delete');
  }


}
