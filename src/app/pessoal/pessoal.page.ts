import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  constructor(private pessoalService : PessoalService) { }

  ngOnInit() {
   //this.pessoalService.findAll
   //console.log();
  }

  pessoalAll() {
    this.pessoalService.findAll()
      .subscribe(Response => {
        console.log(Response);
      },
      error => {
        console.log(error);

      }
      );
  }

  

}
