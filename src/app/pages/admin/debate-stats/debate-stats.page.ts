import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-debate-stats',
  templateUrl: './debate-stats.page.html',
  styleUrls: ['./debate-stats.page.scss'],
})
export class DebateStatsPage implements OnInit {

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
