import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public appMenu = [
    {label: 'Accueil', url: 'home', icon: 'home'},
    {label: 'Poser une question', url: 'new-suggestion', icon: 'chatbubbles'},
    {label: 'Aide', url: 'help', icon: 'help'},
    {label: 'Se Déconnecter', url: 'admin-begin', icon: 'log-out'}
  ];

  constructor(
    public menuCtrl : MenuController,
    public router       : Router
  ) {}  

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    this.menuCtrl.enable(true); //used to close the menu
  }

}
