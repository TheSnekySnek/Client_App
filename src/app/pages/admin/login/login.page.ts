import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;

  constructor(
    private connection  : ConnectionService, 
    private router      : Router, 
    private notification: NotificationService,
    public menuCtrl     : MenuController
  ) {}
    /**
   * Automatically closes the menu 
   */
  ionViewWillEnter() {
  }

  /**
   * Login the admin via the connection service
   */
  async login() {
    console.log("I'm logging");
    var status = await this.connection.login(this.username, this.password);
    if (status['connected']) {
      this.router.navigate(['admin-details']);
    }
    else {
      this.notification.displayError(status['message']);
    }
  }

  /**
   * Login the admin via the connection service
   */
  async register() {

    if (!this.username || this.username.length == 0) {
      this.notification.displayError("Veuillez spécifier un nom d'utilisateur");
      return;
    }
    if (!this.password || this.password.length == 0) {
      this.notification.displayError("Veuillez spécifier un mot de passe");
      return;
    }
    var status = await this.connection.register(this.username, this.password);
    
    console.log(status)
    if(status['res']){
      this.notification.displayInfo("Compte créé");
      
      //Auth with the account
      this.login();
    }
    else{
      this.notification.displayError(status['err']);
    }
  }

  async getUsername(){
    return this.username;
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }



}
