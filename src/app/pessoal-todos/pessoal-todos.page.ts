import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { PessoalDTO } from '../models/pessoal.dto';

@Component({
  selector: 'app-pessoal-todos',
  templateUrl: './pessoal-todos.page.html',
  styleUrls: ['./pessoal-todos.page.scss'],
})
export class PessoalTodosPage implements OnInit {
  items: PessoalDTO[];

  constructor(private pessoalService : PessoalService) { 
    this.pessoalGetAll();
  }

  ngOnInit() {
  }

  pessoalGetAll() {
    this.pessoalService.findAll()
      .subscribe(Response => {
        this.items = Response;
        console.log(Response);
      },
      error => {
        console.log(error);

      });
  }


}
