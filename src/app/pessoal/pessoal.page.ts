import { UsuarioService } from './../services/usuario.service';
import { UsuarioDTO } from './../models/usuario';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PessoalService } from './../services/pessoal.service';
import { StorageService } from '../services/storage.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  prontuario: any;
  usuario: UsuarioDTO;
  
  constructor(public navCtrl : NavController,
              public pessoalService: PessoalService,
              public usuarioService: UsuarioService,
              private storage: StorageService,
              public toastController: ToastController,
              public alertController: AlertController) { }


  getUserProfile() {
    this.usuarioService.getLoggedInUser()
    .subscribe(Response => {
      this.usuario = Response;
      //this.usuario.setSt
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log(this.usuario);
    },
    error => { 
      if (error.status == 403) {
        this.navCtrl.navigateRoot('login');
      }
    }
    )
  };

  ngOnInit() {
    
  this.getUserProfile();

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

      /*
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
      */

    //console.log(Object.keys(jsonData));
    //if (jsonData.perfilPessoal == null) {
      //console.log('jsonData.perfilPessoal  / Vaziooooooooooooooo');
    //}
    //else {
      //console.log(Object.keys(jsonData.perfilPessoal));
    //}

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
      },
      error => { }
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

  addPerfilPessoal() {
    this.navCtrl.navigateForward('pessoal-base');
  }

  exibirPessoalMedicamentos() {
    this.navCtrl.navigateForward('pessoal-medicamentos');
  }

  

}
