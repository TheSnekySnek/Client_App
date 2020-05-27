import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.page.html',
  styleUrls: ['./begin.page.scss'],
})
export class BeginPage implements OnInit {
  public isLarge = false;
  constructor(
    public menuCtrl: MenuController
  ) { 
  
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

}
