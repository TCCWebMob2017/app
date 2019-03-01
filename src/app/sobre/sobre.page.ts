import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  segment: number;
  @ViewChild("slides") slides;

  constructor() { 
    this.segment = 0;
  }

  ngOnInit() {
  }

  public async setSegment(activeIndex: Promise<number>) {
    this.segment = await activeIndex;
  }
    

}
