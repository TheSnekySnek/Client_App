import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { DebateService } from 'src/app/services/debate.service';
import {QuestionService} from "../../../services/question.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-debate-questions',
  templateUrl: './debate-questions.page.html',
  styleUrls: ['./debate-questions.page.scss'],
})
export class DebateQuestionsPage implements OnInit {

  availableQuestions  : any[] = [];
  debateId            : string;

  constructor(
    private route         : ActivatedRoute,
    private router        : Router,
    private debateManager : DebateService
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
   * Go to the new question page
   */
  addQuestion(){
    this.router.navigate(['debate-new-question']);
  }

  /**
   * Updates the list of questions
   */
  private async updateQuestions(){
    this.availableQuestions = await this.debateManager.getDebateQuestions(this.debateId);
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
