import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {StatService} from "../../../services/statistic.service";
import { DebateService } from 'src/app/services/debate.service';
import { Chart } from "chart.js";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-debate-stats',
  templateUrl: './admin-stats.page.html',
  styleUrls: ['./admin-stats.page.scss'],
})
export class AdminStatsPage implements OnInit {

  statDebates: any[] = [];

  constructor(
      private router: Router,
      private statManager: StatService,
      private debateManager: DebateService,
      public menuCtrl: MenuController
  ) {
  }

  /**
   * Get the stats for the debate on the server
   */
  private async getStats() {
    console.log("Sending things")
    this.statDebates = await this.statManager.getAdminStats();
    console.log(this.statDebates);
  }

  /**
   * Generate the view for a debate
   * @param debate an object debate that will be the debate that we want to view
   */
  private viewDebate(debate: any){
    console.log(debate.id);
    const idDebate: {debateId: number} = {debateId: debate.id};
    this.debateManager.saveDebate(idDebate);
    this.router.navigate(['debate']);
  }

  /**
   * Returns the user to the home page
   */
  disconnect(){
    this.router.navigate(['admin-begin']);
  }

  /**
   * Get the stats for a debate
   */
  async ionViewWillEnter() {
      await this.getStats();
      this.menuCtrl.enable(false);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }
}
