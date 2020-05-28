import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {Router} from "@angular/router";
import {StatService} from "../../../services/statistic.service";
import { QuestionService } from 'src/app/services/question.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-debate-stats',
  templateUrl: './openquestion-stats.page.html',
  styleUrls: ['./openquestion-stats.page.scss'],
})
export class OpenQuestionStatsPage implements OnInit {

  statResponses : any[] = [];
  questionId    : any[] = [];

  constructor(
      private router          : Router,
      private statManager     : StatService,
      private questionManager : QuestionService
  ) {}

  /**
   * Updates the list of questions
   */
  private async getStats() {
    console.log("Sending things");
    console.log(this.questionId);
    this.statResponses = await this.statManager.getQuestionStats(this.questionId);
  }

  /**
   * Get the stats on the execution of the page
   */
  async ionViewWillEnter(){
    if(this.questionManager.getSavedQuestion() !== undefined && this.questionManager.getSavedQuestion() !== null) {
      this.questionId = this.questionManager.getSavedQuestion();
      await this.getStats();
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    this.questionManager.onNewResponseOpenQuestion(() => {
       this.getStats();
    });
  }

}
