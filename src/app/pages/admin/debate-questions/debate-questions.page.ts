import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { DebateService } from 'src/app/services/debate.service';
import { QuestionService } from 'src/app/services/question.service';
import {NotificationService} from "../../../services/notification.service";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-debate-questions',
  templateUrl: './debate-questions.page.html',
  styleUrls: ['./debate-questions.page.scss'],
})
export class DebateQuestionsPage implements OnInit {
  availableQuestions  : any[] = [];
  public debateId     : string;

  constructor(
    private route           : ActivatedRoute,
    private router          : Router,
    private debateManager   : DebateService,
    private questionManager : QuestionService,
    public menuCtrl         : MenuController
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
   * Generate the view for a question
   * @param question an object question that will be the question that we want to view
   */
  private viewQuestion(question: any){
    const idQuestion: any = [question.id, this.debateId];
    this.questionManager.saveQuestion(idQuestion);
    if(question.isOpenQuestion === true){
      this.router.navigate(['question-admin/openstats']);
    } else {
      this.router.navigate(['question-admin/closedstats']);
    }
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateQuestions();
    this.menuCtrl.enable(false);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

}
