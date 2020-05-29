import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DebateService} from "../../../services/debate.service";
import { AlertController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-debate-suggested-questions',
  templateUrl: './debate-suggested-questions.page.html',
  styleUrls: ['./debate-suggested-questions.page.scss'],
})
export class DebateSuggestedQuestionsPage implements OnInit {
  availableSuggestions  : any[] = [];
  debateId              : string;

  constructor(
    private router              : Router,
    private debateManager       : DebateService,
    private alertController     : AlertController,
    private notificationManager : NotificationService,
    public menuCtrl             : MenuController
  ) {}

  /**
   * Sort and return the sorted suggestions
   */
  private getAvailableSuggestions() {
    return this.availableSuggestions.sort((a, b) => b.votes - a.votes);
  }

  /**
   * Updates the list of questions
   */
  private async updateSuggestions(){
    this.availableSuggestions = await this.debateManager.getDebateSuggestions(this.debateId);
    console.log(this.availableSuggestions);
  }

  /**
   * Displays the alert that lets the admin ban an user
   */
  async presentBanAlert(user) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: "Bannir l'utilisateur",
      message: 'Cette utilisateur ne sera plus en mesure de participer au débat.',
      buttons: [
        {
          text: 'Oui',
          handler: async () => {
            console.log(user);
            //Ban the user
            await this.debateManager.banUser(this.debateId, user);
            this.notificationManager.displayInfo("L'utilisateur à été banni");
          }
        },
        {
          text: 'Non',
          handler: () => {
            
          }
        },
      ]
    });

    //Display the alert
    await alert.present();
  }

  /**
   * Unban a user from the debate
   * @param user
   */
  async unbanUser(user: string) {
    let res = await this.debateManager.unbanUser(user);
    if (res) {
      this.notificationManager.displayInfo("Le ban a été annulé");
    } else {
      this.notificationManager.displayInfo("Erreur lors de l'annulation du ban");
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    this.debateManager.onNewVote(suggestionId => {
      const suggestion = this.availableSuggestions.find(s => s.suggestionId == suggestionId);
      suggestion["votes"]++;
    });

    this.debateManager.onSuggestedQuestion(suggestion => {
      this.availableSuggestions.push(suggestion);
    });

    this.debateManager.onDeletedSuggestion(suggestionId => {
      for (let s of this.availableSuggestions) {
        if (s.suggestionId === suggestionId) {
          s.removed = true;
        }
      }
    });
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateSuggestions();
    this.menuCtrl.enable(false);
  }
}
