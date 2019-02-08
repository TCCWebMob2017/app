import { Usuario } from './../models/usuario';
import { UsuarioService } from '../usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario : Usuario = new Usuario();

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
  }

  usuarioLogin() {
    // Chama tela de aguarde
    this.usuarioService.getUsuarioById('7c0dd049-a366-4605-87de-852e89a2977d')
    .then((response)=>{
      this.usuario = JSON.parse(JSON.stringify(response));
      // Fecha tela de aguarde
      
      //console.log('usuario.nome: ' + this.usuario.nome);
      console.log('usuario.Pessoal: ' + this.usuario.perfilPessoal.nome);

    })

    .catch((response)=>{
      // Fecha tela de aguarde
    })

  }

}
