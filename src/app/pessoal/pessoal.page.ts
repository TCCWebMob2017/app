import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { PessoalDTO } from '../models/pessoal.dto';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  //pessoal: PessoalDTO;
  prontuario: any;
  medicamentos: any;

  constructor(public navCtrl : NavController,
              private pessoalService : PessoalService,
              private storage  : StorageService) { }

  ngOnInit() {
   //this.pessoalService.findAll
   //console.log();
    
   let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {

      /*
      this.pessoalService.findById(localUser.id)
      .subscribe(Response => {
        this.pessoal = Response;
        //this.getImageIfExist();
        console.log('pessoa:ngOnInit');
        console.log(Response);
      },
      */

      this.pessoalService.getLoggedInUser()
        .subscribe(Response => {
        this.prontuario = Response;       
        //console.log(this.prontuario);

        this.storage.setLocalProfile(this.prontuario);
        
        this.medicamentos = this.prontuario.perfilPessoal.medicamentos;
        console .log(this.medicamentos);
        //const parsed = JSON.parse(this.prontuario.perfilPessoal); 
        
        },
      error => {
        if (error.status == 403) {
          this.navCtrl.navigateRoot('login');
        }
      });
    }
    else {
      this.navCtrl.navigateRoot('login');
    }
  }

  getImageIfExist() {
    this.pessoalService.getImageFromBucket(this.prontuario.pessoal.id)
    .subscribe(Response => {
      this.prontuario.pessoal.imageUrl = "";
    },
    error => {});
    //https://api-qlife.herokuapp.com/api/v1/pessoal/000/avatar
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

  showFichaMedica() {
    //this.navCtrl.navigateRoot('ficha-medica'); //, this.pessoal );
    this.navCtrl.navigateForward('ficha-medica');
    //this.router.navigateByUrl(path);
  }

  showFichaMedicaForward() {
    this.navCtrl.navigateForward('ficha-medica');
  }

  

}
