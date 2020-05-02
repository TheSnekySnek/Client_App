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

  isOpenQuestion: boolean = false;
  numAnswers: number = 2;
  title: string;
  description: string;
  answers: string[] = new Array(8);

  constructor(
    private notification: NotificationService, 
    private question: QuestionService, 
    private router: Router
  ) {}
  
  /**
   * Suggests a new question via the Question service
   */
  async suggestQuestion(){
    if(!this.title || this.title.length == 0){
      this.notification.displayError("Veuillez spécifier un titre");
      return;
    }
    if(!this.description || this.description.length == 0){
      this.notification.displayError("Veuillez spécifier une description");
      return;
    }
    var status = false;
    if(!this.isOpenQuestion){
      var ans = [];
      for (let i = 0; i < this.numAnswers; i++) {
        ans.push(this.answers[i]);
      }
      status = await this.question.suggestQuestion({
        title: this.title,
        description: this.description,
        isOpenQuestion: false,
        answers: ans
      })
    }
    else{
      status = await this.question.suggestQuestion({
        title: this.title,
        description: this.description,
        isOpenQuestion: true
      })
    }
    if(status){
      this.notification.displayInfo("Question envoyée")
      this.router.navigate(['home']);
    }
    else{
      this.notification.displayError(
        "Une erreur est survenue lors de l'envoi de la question"
      )
    }
  }

  ngOnInit() {
  }

  //This lets us display the right number of inputs
  arrayTwo(n: number): number[] {
    return [...Array(n).keys()];
  }

}
