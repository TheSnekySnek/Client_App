import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import {ConnectionService} from "../../../services/connection.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  availableQuestions: any[] = [];
  answeredQuestions : any[] = [];

  constructor(
    private questions   : QuestionService, 
    private route       : ActivatedRoute,
    private router      : Router,
    private notification: NotificationService,
    private connection  : ConnectionService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let questionId = this.router.getCurrentNavigation().extras.state.questionId;
        console.log(`Question ${questionId} was answered`);
        this.updateQuestions();
      }
    });

    this.connection.onDisconnect(() => {
      this.router.navigate(["/login"])
    });
  }

  /**
   * Clear the list of questions and query the server for an updated list of questions.
   * If the server does not send anything, we trust the result and assume there are no questions.
   */
  private async updateQuestions(){
    console.log("GETTING QUESTIONS");
    this.availableQuestions = [];
    this.answeredQuestions = [];

    var questions = await this.questions.getQuestions();
    console.log(questions);
    questions.forEach(q => {
      if(q['answered'] === true)
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
   * Returns the user to the home page
   */
  disconnect(){
    this.router.navigate(['admin-begin']);
  }
  
  /**
   * Set up the listener for new question when the page starts
   */
  ngOnInit() {
    this.questions.onNewQuestion((question) => {
      this.availableQuestions.push(question);
      this.notification.displayNotification("Une nouvelle question est disponible", question['title']);
    });
  }

  /**
   * Element triggered when the page has loaded
   */
  ionViewWillEnter(){
    this.updateQuestions();
  }

  

}
