import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  segment: number;
  @ViewChild("slides") slides;

  public list: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

  constructor() { 
    this.segment = 0;
  }

  ngOnInit() {
  }

  public async setSegment(activeIndex: Promise<number>) {
    this.segment = await activeIndex;
  }
    



  deletarItem() {
    console.log('Delete');
  }

  async modificarItem(slidingItem: IonItemSliding) {
    await slidingItem.close();
    console.log('Modificar');
  }


  async deleteItem(slidingItem: IonItemSliding, item: any) {
    slidingItem.close();
    //await this.itemService.deleteItem(item);
    console.log('deleteItem');
  }

  ionSwipeItem(par1, par2) {
    console.log('IonSwipeItem');
    console.log(par1);
    console.log(par2);
  }

async del(slidingItem: IonItemSliding, event, item: any, index: number){

 	await slidingItem.close();
  let indexx = this.list.indexOf(item);
  
  console.log('Item: ' + item + ' / Index: ' + index);
  console.log(slidingItem);
  console.log(event);

  if(index > -1){
      this.list.splice(index, 1);
  }
}




search(q: string) { 
  console.log(q); 
}

}
