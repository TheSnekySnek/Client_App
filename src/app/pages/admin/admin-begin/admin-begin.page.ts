import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin-begin',
  templateUrl: './admin-begin.page.html',
  styleUrls: ['./admin-begin.page.scss'],
})
export class AdminBeginPage implements OnInit {

  constructor(
    public menuCtrl: MenuController
  ) {}

  /**
   * Closes the menu automatically
   */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

}
