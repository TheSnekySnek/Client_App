import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-begin',
  templateUrl: './admin-begin.page.html',
  styleUrls: ['./admin-begin.page.scss'],
})
export class AdminBeginPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    public router: Router

    ) {}
    ionViewWillEnter() {
      this.menuCtrl.enable(true);

    }

  ngOnInit() {
  }

}
