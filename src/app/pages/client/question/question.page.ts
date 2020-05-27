import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import {NavigationExtras, Router} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  question  : any;
  selection : number = -1;
  openAnswer: string;

  constructor(
    private questions   : QuestionService, 
    private router      : Router, 
    private notification: NotificationService
  ) {}

  /**
   * Gets the answer of a question and sends it to the server
   */
  async answerQuestion(){
    if(this.selection < 0){
      this.notification.displayError("Sélectionnez une réponse");
      return;
    }
    if(await this.questions.answerQuestion(this.question['id'], this.selection)){
      this.navigateToQuestions(this.question["id"]);
    }
    else{
      this.notification.displayError(
        "Erreur lors du vote. Veuillez réessayer plus tard"
      );
    }
  }

  /**
   * Gets the answer of an open question and sends it to the server
   */
  async answerOpenQuestion(){
    if(!this.openAnswer){
      this.notification.displayError("Veuillez entrer une réponse");
      return;
    }
    if(await this.questions.answerOpenQuestion(this.question['id'], this.openAnswer)){
      this.navigateToQuestions(this.question["id"]);
    }
    else{
      this.notification.displayError(
          "Erreur lors du vote. Veuillez réessayer plus tard"
      );
    }
  }

  /**
   * Navigate to the questions page and send questionId
   * @param questionId id of the question
   */
  navigateToQuestions(questionId : number) {
    this.notification.displayInfo("Votre vote a été pris en compte");
    let navigationExtras : NavigationExtras = {
      state: {
        questionId: questionId
      }
    };

    this.router.navigate(['home/questions'], navigationExtras);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    this.question = this.questions.getSavedQuestion();
  }

}
