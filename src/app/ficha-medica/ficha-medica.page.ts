import { PessoalDTO } from './../models/pessoal.dto';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements OnInit {

  //pessoal: PessoalDTO = {
  pessoal: any = {

    id: "21e78c4d-34aa-4816-859d-98a7a3ea6f29",
    nome:  "Alcenir Felix de Carvalho Toledo",
    email: "afelix@softquim.com.br",
    telefone: "12997792854"
    
  };




  constructor() { }

  ngOnInit() {

    let _pessoal: PessoalDTO;
    //_pessoal.nome = "BBBB";
    //this.pessoal.nome = "AAAA";

    console.log('');
    console.log(_pessoal);
    
    console.log(this.pessoal);


  }

}
