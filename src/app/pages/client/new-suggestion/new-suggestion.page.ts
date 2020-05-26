import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import {SuggestionService} from "../../../services/suggestion.service";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-suggestion.page.html',
  styleUrls: ['./new-suggestion.page.scss'],
})
export class NewSuggestionPage implements OnInit {
  suggestedQuestion : string;

  constructor(
    private notification: NotificationService, 
    private suggestion  : SuggestionService,
    private router      : Router
  ) {}
  
  /**
   * Suggests a new question via the Question service
   */
  async suggestQuestion(){
    if(!this.suggestedQuestion) {
      this.notification.displayError("Veuillez spécifier une suggestion");
      return;
    }

    const status = await this.suggestion.suggestQuestion(this.suggestedQuestion);
    if(status){
      this.notification.displayInfo("Suggestion envoyée");
      this.router.navigate(['home/suggestions']);
    }
    else{
      this.notification.displayError(
        "Une erreur est survenue lors de l'envoi de la suggestion"
      );
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }
}
