import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  availableQuestions: any[] = [];
  answeredQuestions: any[] = [];

  constructor(private questions: QuestionService, private router: Router, private notification: NotificationService) { 
    
  }

  private async updateQuestions(){
    console.log("GETTING QUESTIONS")
    this.availableQuestions = [];
    this.answeredQuestions = [];
    //var questions = await this.questions.getQuestions()
    var questions = await this.questions.getQuestions();
    console.log(questions)
    questions.forEach(q => {
      if(q['answered'])
        this.answeredQuestions.push(q);
      else
        this.availableQuestions.push(q);
    });
  }

  viewQuestion(question){
    this.questions.saveQuestion(question);
    this.router.navigate(['question']);
  }

  newQuestion(){
    this.router.navigate(['new-question']);
  }

  ngOnInit() {
    this.questions.onNewQuestion((question) => {
      this.availableQuestions.push(question)
      this.notification.displayNotification("Une nouvelle question est disponible", question['title'])
    })
  }

  ionViewWillEnter(){
    this.updateQuestions()
  }

  

}
