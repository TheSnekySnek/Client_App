import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { DebateService } from 'src/app/services/debate.service';
import { QuestionService } from 'src/app/services/question.service';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-debate-questions',
  templateUrl: './debate-questions.page.html',
  styleUrls: ['./debate-questions.page.scss'],
})
export class DebateQuestionsPage implements OnInit {
  availableQuestions  : any[] = [];
  public debateId     : string;

  constructor(
    private route         : ActivatedRoute,
    private router        : Router, 
    private debateManager : DebateService,
    private questionManager : QuestionService
  ) {
      this.route.queryParams.subscribe(params => {
      // Refresh if needed
      if (this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.refresh) {
        this.updateQuestions();
      }
    });
  }

  /**
   * Go to the new question-admin page
   */
  addQuestion(){
    this.router.navigate(['debate-new-question-admin']);
  }

  /**
   * Updates the list of questions
   */
  private async updateQuestions(){
    this.availableQuestions = await this.debateManager.getDebateQuestions(this.debateId);
  }

  private viewQuestion(question: any){
    const idQuestion: any = [question.id, this.debateId];
    this.questionManager.saveQuestion(idQuestion);
    this.router.navigate(['question-admin']);
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateQuestions();
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

}
