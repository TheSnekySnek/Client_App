import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-debate',
  templateUrl: './admin-details.page.html',
  styleUrls: ['./admin-details.page.scss'],
})
export class AdminDetailPage implements OnInit {

  constructor(
    public menuCtrl: MenuController
    ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

}
