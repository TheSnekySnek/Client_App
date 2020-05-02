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

  constructor(
    private questions: QuestionService, 
    private router: Router, 
    private notification: NotificationService
  ) {}

  /**
   * Updates the list of question
   */
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

  /**
   * Saves the question and loads the question page
   * @param question Question to view
   */
  viewQuestion(question){
    this.questions.saveQuestion(question);
    this.router.navigate(['question']);
  }

  /**
   * Loads the new question client page
   */
  newQuestion(){
    this.router.navigate(['new-question']);
  }

  /**
   * Set up the listener for new question when the page starts
   */
  ngOnInit() {
    this.questions.onNewQuestion((question) => {
      this.availableQuestions.push(question)
      this.notification.displayNotification("Une nouvelle question est disponible", question['title'])
    })
  }

  /**
   * Update the list of questions when the page has loaded
   */
  ionViewWillEnter(){
    this.updateQuestions()
  }

  

}
