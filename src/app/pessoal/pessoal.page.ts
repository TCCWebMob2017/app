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

  prontuario  : any;
  usuario     : UsuarioDTO;
  
  constructor(public  navCtrl         : NavController,
              public  pessoalService  : PessoalService,
              public  usuarioService  : UsuarioService,
              private storage         : StorageService,
              public  toastController : ToastController,
              public  alertController : AlertController) { }

  ngOnInit() { 
    this.buscarDadosUsuarioApi();
    //this.buscaProntuario_back();
  }


  buscarDadosUsuarioApi() {
    let _localUser = this.storage.getLocalUser();
    if(_localUser && _localUser.email) {
      this.usuarioService.getLoggedInUser()
      .subscribe(Response => {
        this.usuario = Response;
        //console.log(this.usuario);
        this.storage.setUsuarioDados(this.usuario);
      },
      error => { 
        if (error.status == 403) {
          this.navCtrl.navigateRoot('login');
        }
      })
    }
    else { this.navCtrl.navigateRoot('login'); }
  };


  buscaProntuario_back() {

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
        this.storage.setUsuarioDados(this.prontuario);



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
    this.navCtrl.navigateForward(['pessoal-base', {modoCRUD: 'C'}]);
  }

  exibirPessoalBase() {
    this.navCtrl.navigateForward(['pessoal-base', {modoCRUD: 'R'}]);
  }

  modificarPessoalBase() {
    this.navCtrl.navigateForward(['pessoal-base', {modoCRUD: 'U'}]);
  }

  exibirPessoalMedicamentos() {
    this.navCtrl.navigateForward(['pessoal-medicamentos', {modoCRUD: 'R'}]);
  }

  exibirPessoalDoencas() {
    this.navCtrl.navigateForward(['pessoal-doencas', {modoCRUD: 'R'}]);
  }

  exibirPessoalAlergias() {
    this.navCtrl.navigateForward(['pessoal-alergias', {modoCRUD: 'R'}]);
  }

  exibirPessoalDependentes() {
    this.navCtrl.navigateForward(['pessoal-dependentes', {modoCRUD: 'R'}]);
  }

  exibirPessoalCirurgias() {
    this.navCtrl.navigateForward(['pessoal-cirurgias', {modoCRUD: 'R'}]);
  }

  exibirPessoalPermissoes() {
    this.navCtrl.navigateForward(['pessoal-permissoes', {modoCRUD: 'R'}]);
  }  

}
