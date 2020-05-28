import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-debate',
  templateUrl: './debate.page.html',
  styleUrls: ['./debate.page.scss'],
})
export class DebatePage implements OnInit {

  constructor(
    public menuCtrl: MenuController
    ) {}

  /**
   * Ferme le menu automatiquement
   */  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

}
