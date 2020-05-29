import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {StatService} from "../../../services/statistic.service";
import { DebateService } from 'src/app/services/debate.service';
import { QuestionService } from 'src/app/services/question.service';
import { Chart } from "chart.js";
import { MenuController } from '@ionic/angular';

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
      private router          : Router,
      private statManager     : StatService,
      private debateManager   : DebateService,
      private questionManager : QuestionService,
      public menuCtrl         : MenuController
  ) {}

  /**
   * Get the stats for the debate on the server
   */
  private async getStats() {
    console.log("Sending things")
    this.statQuestions = await this.statManager.getDebateStats(this.debateId);
    console.log(this.statQuestions);
  }

  /**
   * Generate the view for a question
   * @param question an object question that will be the question that we want to view
   */
  private viewQuestion(question: any){
    const idQuestion: any = [question.id, this.debateId];
    this.questionManager.saveQuestion(idQuestion);
    this.router.navigate(['question-admin']);
  }

  /**
   * Generate the bar chart for the top 10 questions
   */
  private generateChart() {
    // Initialize the chart
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "# nombre de réponses",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255,0,231,0.2)",
              "rgba(255,149,0,0.2)",
              "rgba(255,0,81,0.2)",
              "rgba(79,0,255,0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,0,231,1)",
              "rgba(255,149,0,1)",
              "rgba(255,0,81,1)",
              "rgba(79,0,255,1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [{ barPercentage: 0.5 }]
        }
      }
    });
    const nbQuestions = this.statQuestions[2].length > 10 ? 10 : this.statQuestions[2].length;
    console.log(nbQuestions);
    // Add the questions to the chart
    for (let i = 0; i < nbQuestions; i++) {
      console.log(this.statQuestions[2][i]);
      this.barChart.data.labels.push(this.statQuestions[2][i].title);
      this.barChart.data.datasets.forEach((dataset) => {
        console.log(dataset);
        dataset.data.push(this.statQuestions[2][i].numberVotes);
      });
    }
    this.barChart.update();
  }

  /**
   * Get the stats for a debate
   */
  async ionViewWillEnter() {
    if (this.debateManager.getSavedDebate() !== undefined && this.debateManager.getSavedDebate() !== null) {
      this.debateId = this.debateManager.getSavedDebate()['debateId'];
      await this.getStats();
      this.menuCtrl.enable(false);
    }
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {

    this.debateManager.onNewQuestion(async question => {
      console.log("Rceived new question");
      await this.getStats();
      this.generateChart();
    });

    this.questionManager.onNewResponseOpenQuestion(async response => {
      console.log("Rceived new question");
      await this.getStats();
      this.generateChart();
    });

    this.questionManager.onNewResponseCloseQuestion(async response => {
      console.log("Rceived new question");
      await this.getStats();
      this.generateChart();
    });
  }
}
