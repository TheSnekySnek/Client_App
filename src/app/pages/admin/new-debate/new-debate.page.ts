import { Component, OnInit } from '@angular/core';
import { DebateService } from 'src/app/services/debate.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-new-debate',
  templateUrl: './new-debate.page.html',
  styleUrls: ['./new-debate.page.scss'],
})
export class NewDebatePage implements OnInit {

  private title       : string;
  private description : string;

  constructor(
    private debateManager : DebateService, 
    private notification  : NotificationService, 
    private router        : Router,
    public menuCtrl       : MenuController

    ) {}

  /**
   * Creates a new debate
   */
  async createDebate(){
    if(!this.title || this.title.length == 0){
      this.notification.displayError("Please specify the title");
      return;
    }
    if(!this.description || this.description.length == 0){
      this.notification.displayError("Please specify the description");
      return;
    }
    var debateId = await this.debateManager.createDebate(
      {
        title       : this.title,
        description : this.description
      }
    );
    console.log("New Debate:", debateId);
    this.notification.displayInfo("Debat crée avec l'id " + debateId);
    this.debateManager.saveDebate({
      debateId    : debateId,
      title       : this.title,
      description : this.description
    });
    this.router.navigate(['debate']);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

  /**
   * Closes the menu automatically
   */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
