import { Component, OnInit } from '@angular/core';
import {DebateService} from "../../../services/debate.service";

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.page.html',
  styleUrls: ['./debate-details.page.scss'],
})
export class DebateDetailsPage implements OnInit {
  debateId : string;
  details  : any;

  constructor(
    private debateManager : DebateService
  ) { }

  /**
   * Update the debate details
   */
  async updateDetails() {
    this.details = await this.debateManager.getDebateDetails(this.debateId);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateDetails();
  }

}
