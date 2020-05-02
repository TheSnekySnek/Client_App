import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  question: any;
  selection: number = -1;

  constructor(private questions: QuestionService, private router: Router, private notification: NotificationService) { }

  async answerQuestion(){
    if(this.selection < 0){
      this.notification.displayError("Sélectionnez une réponse")
      return;
    }
    if(await this.questions.answerQuestion(this.question['id'], this.selection)){
      this.notification.displayInfo("Votre vote a été pris en compte")
      this.router.navigate(['home']);
    }
    else{
      this.notification.displayError("Erreur lors du vote. Veuillez réessayer plus tard")
    }
  }

  ngOnInit() {
    this.question = this.questions.getSavedQuestion()
  }

}
