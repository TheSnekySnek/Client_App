import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.page.html',
  styleUrls: ['./new-question.page.scss'],
})
export class NewQuestionPage implements OnInit {
  suggestedQuestion : string;

  constructor(
    private notification: NotificationService, 
    private question    : QuestionService, 
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

    const status = await this.question.suggestQuestion(this.suggestedQuestion);
    if(status){
      this.notification.displayInfo("Suggestion envoyée");
      this.router.navigate(['home']);
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
