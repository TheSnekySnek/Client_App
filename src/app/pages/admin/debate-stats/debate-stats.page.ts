import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {StatService} from "../../../services/statistic.service";
import { DebateService } from 'src/app/services/debate.service';
import { QuestionService } from 'src/app/services/question.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-debate-stats',
  templateUrl: './debate-stats.page.html',
  styleUrls: ['./debate-stats.page.scss'],
})
export class DebateStatsPage implements OnInit {
  private barCanvas: ElementRef;

  @ViewChild("barCanvas", {static: false}) set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
      this.barCanvas = content;
      this.generateChart();
    }
  };

  statQuestions: any[] = [];
  debateId: string;
  barChart: Chart;

  constructor(
      private router: Router,
      private statManager: StatService,
      private debateManager: DebateService,
      private questionManager : QuestionService
  ) {
  }

  /**
   * Updates the list of questions
   */
  private async getStats() {
    console.log("Sending things")
    this.statQuestions = await this.statManager.getDebateStats(this.debateId);
    console.log(this.statQuestions);
  }

  private viewQuestion(question: any){
    const idQuestion: any = [question.id, this.debateId];
    this.questionManager.saveQuestion(idQuestion);
    this.router.navigate(['question-admin']);
  }

  private generateChart() {
    console.log("Generating stats")
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        datasets: []
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    this.barChart.data.datasets.push({
      label: "# number of votes",
      data: []
      //color: if we need a color
    });
    const nbQuestions = this.statQuestions[2].length > 10 ? 10 : this.statQuestions[2].length;
    console.log(nbQuestions);
    for (let i = 0; i < nbQuestions; i++) {
      console.log(this.statQuestions[2][i]);
      this.barChart.data.labels.push(this.statQuestions[2][i].title);
      this.barChart.data.datasets.forEach((dataset) => {
        console.log(dataset);
        dataset.data.push(this.statQuestions[2][i].numberVotes);
      });
    }
    this.barChart.update();
    return this.barChart;
  }

  /**
   * Get the debate id from the debate manager
   */
  async ionViewWillEnter() {
    if (this.debateManager.getSavedDebate() !== undefined && this.debateManager.getSavedDebate() !== null) {
      this.debateId = this.debateManager.getSavedDebate()['debateId'];
      await this.getStats();
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }
}
