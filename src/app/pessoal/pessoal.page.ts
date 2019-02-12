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

  pessoal: PessoalDTO;

  constructor(public navCtrl : NavController,
              private pessoalService : PessoalService,
              private storage  : StorageService) { }

  ngOnInit() {
   //this.pessoalService.findAll
   //console.log();
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {

      this.pessoalService.findById(localUser.id)
      .subscribe(Response => {
        this.pessoal = Response;
        //this.getImageIfExist();
      },
      error => {
        console.log('deu erro 1');
        console.log(error);
        console.log('deu erro 2');
        console.log(error.status);
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
    this.pessoalService.getImageFromBucket(this.pessoal.id)
    .subscribe(Response => {
      this.pessoal.imageUrl = "";
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

    this.navCtrl.navigateRoot('ficha-medica'); //, this.pessoal );
    //this.router.navigateByUrl(path);

  }

  

}
