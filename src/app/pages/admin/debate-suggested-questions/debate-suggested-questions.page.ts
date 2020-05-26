import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DebateService} from "../../../services/debate.service";

@Component({
  selector: 'app-debate-suggested-questions',
  templateUrl: './debate-suggested-questions.page.html',
  styleUrls: ['./debate-suggested-questions.page.scss'],
})
export class DebateSuggestedQuestionsPage implements OnInit {
  availableSuggestions  : any[] = [];
  debateId              : string;

  constructor(
    private router        : Router,
    private debateManager : DebateService
  ) {}

  /**
   * Sort and return the sorted suggestions
   */
  private getAvailableSuggestions() {
    return this.availableSuggestions.sort((a, b) => b.votes - a.votes);
  }

  /**
   * Updates the list of questions
   */
  private async updateSuggestions(){
    this.availableSuggestions = await this.debateManager.getDebateSuggestions(this.debateId);
    console.log(this.availableSuggestions);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    this.debateManager.onNewVote(suggestionId => {
      let suggestion = this.availableSuggestions.find(s => s.suggestionId == suggestionId);
      suggestion["votes"]++;
    });

    this.debateManager.onSuggestedQuestion(suggestion => {
      this.availableSuggestions.push(suggestion);
    });
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateSuggestions();
  }
}
