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

  constructor(public navCtrl : NavController,
              private pessoalService : PessoalService,
              private storage  : StorageService) { }

  ngOnInit() {
    
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

// ////////////////////////////////////////////
//var jsonData = [{"person":"me","age":"30"}, {"person":"you","age":"25"}];
var jsonData = this.prontuario;
/*
for(var i in jsonData){
  var key = i;
  var val = jsonData[i];
  for(var j in val){
    var sub_key = j;
    var sub_val = val[j];
    console.log(sub_key + ': ' + sub_val);
  }
}
*/

console.log(jsonData);
var keys = [];
for(var i = 0;i<jsonData.length;i++)
{
    Object.keys(jsonData[i]).forEach(function(key){
        if(keys.indexOf(key) == -1)
        {
            keys.push(key);
        }
    });
}
console.log(keys);

for(var obj in jsonData){
  if(jsonData.hasOwnProperty(obj)){
  for(var prop in jsonData[obj]){
      if(jsonData[obj].hasOwnProperty(prop)){
         console.log( prop + 
                      '/ ' + jsonData[obj][prop] + 
                      '/ ' + prop.length + 
                      '/ ' + obj.length);
      }
  }
}
}

console.log(Object.keys(jsonData));
console.log(Object.keys(jsonData).length)

// ////////////////////////////////////////////

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
