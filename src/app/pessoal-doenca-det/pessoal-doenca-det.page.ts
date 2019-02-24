import { Component, OnInit } from '@angular/core';
import { DoencaDTO } from '../models/doenca';

@Component({
  selector: 'app-pessoal-doenca-det',
  templateUrl: './pessoal-doenca-det.page.html',
  styleUrls: ['./pessoal-doenca-det.page.scss'],
})
export class PessoalDoencaDetPage implements OnInit {

  public doenca: DoencaDTO;
  constructor() { }

  ngOnInit() {

    //this.doenca = "";
    
  }


  /* 
"doencas": [
    {
      "desde": "dd/MM/yyyy",
      "doenca": {
        "cid": "string",
        "created": "dd/MM/yyyy HH:mm:ss",
        "descricao": "string",
        "id": "string",
        "nome": "string",
        "nomesPopulares": [
          "string"
        ]
      },
      "observacao": "string",
      "privacidade": {}
    }
  ],  
  
  */

}
