import { ModalController, PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})

export class MenuUsuarioComponent implements OnInit {
  pop: PopoverController;

  constructor(navParams: NavParams) {
    this.pop = navParams.get('popoverController');
  }

  ngOnInit() {
  }

  async closePopover(value: any) {
    this.pop.dismiss(value);
  }
}