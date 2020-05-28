import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-begin',
  templateUrl: './admin-begin.page.html',
  styleUrls: ['./admin-begin.page.scss'],
})
export class AdminBeginPage implements OnInit {

  constructor(
      private router: Router
  ) {}

  /**
   * Closes the menu automatically
   */
  ionViewWillEnter() {

  }

  ngOnInit() {
  }

}
