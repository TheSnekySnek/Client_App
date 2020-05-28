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
    this.menuCtrl.enable(false);
  }

  /**
   * Login the admin via the connection service
   */
  async login() {
    var status = await this.connection.login(this.username, this.password);
    if (status['connected']) {
      this.router.navigate(['admin-home']);
    }
    else {
      this.notification.displayError(status['message']);
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }



}
