import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  position: string

  constructor() { 
    //this.position = "stacked";
    this.position = "floating";
  }

  ngOnInit() {
  }

}
