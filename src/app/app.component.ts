import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

 public appMenu = [
    {label: 'Accueil', url: 'home', icon: 'home'},
    {label: 'Poser une question', url: 'new-suggestion', icon: 'chatbubbles'},
    {label: 'Aide', url: 'help', icon: 'help'},
    {label: 'Se Déconnecter', url: 'admin-begin', icon: 'log-out'}
  ];


  constructor(
    private platform    : Platform,
    private splashScreen: SplashScreen,
    private statusBar   : StatusBar,
    public router       : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
