import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {Router} from "@angular/router";
import {StatService} from "../../../services/statistic.service";
import { QuestionService } from 'src/app/services/question.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-debate-stats',
  templateUrl: './closedquestion-stats.page.html',
  styleUrls: ['./closedquestion-stats.page.scss'],
})
export class ClosedQuestionStatsPage implements OnInit {
  private barCanvas: ElementRef;
  private doughnutCanvas: ElementRef;

  @ViewChild("barCanvas", {static: false}) set contentB(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
      this.barCanvas = content;
      this.generateBarChart();
    }
  }

  @ViewChild("doughnutCanvas", {static: false}) set contentD(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
      this.doughnutCanvas = content;
      this.generateDoughnutChart();
    }
  }

  statResponses : any[] = [];
  questionId    : any[] = [];
  barChart      : Chart;
  doughnutChart : Chart;

  constructor(
      private router          : Router,
      private statManager     : StatService,
      private questionManager : QuestionService
  ) {}

  /**
   * Updates the list of questions
   */
  private async getStats() {
    console.log("Sending things")
    console.log(this.questionId)
    this.statResponses = await this.statManager.getQuestionStats(this.questionId);
    console.log(this.statResponses);
  }

  /**
   * Generate the bar chart with the number of votes for a response
   */
  private generateBarChart() {
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
      label: "# nombre de votes",
      data: []
    });
    for (const response of this.statResponses[2]) {
      this.barChart.data.labels.push(response.response);
      this.barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(response.numberVotes);
      });
      this.barChart.update();
    }
  }

  /**
   * Generate the Doughnut chart with the percentage of votes between the responses
   */
  private generateDoughnutChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
          datasets: []
      }
    });
    this.doughnutChart.data.datasets.push({
      label: "# Percentage of votes",
      data: []
    });
    for (const response of this.statResponses[2]) {
      this.doughnutChart.data.labels.push(response.response);
      this.doughnutChart.data.datasets.forEach((dataset) => {
        dataset.data.push(response.percentage);
      });
      this.doughnutChart.update();
    }
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
    this.questionManager.onNewResponseCloseQuestion(async () => {
        await this.getStats();
        this.generateBarChart();
        this.generateDoughnutChart();
    });
  }

}
