import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {SuggestionService} from "../../../services/suggestion.service";

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {
  availableSuggestions : any[] = [];
  votedSuggestions     : any[] = [];

  constructor(
      private suggestions : SuggestionService,
      private router      : Router,
      private notification: NotificationService
  ) {}

  /**
   * Clear the list of suggestions and query the server for an updated list of suggestions.
   * If the server does not send anything, we trust the result and assume there are no suggestions.
   */
  private async updateSuggestions(){
    console.log("GETTING SUGGESTIONS");
    this.availableSuggestions = [];

    var suggestions = await this.suggestions.getSuggestions();
    if (suggestions.length === 0)
      return;

    suggestions.forEach(s => {
      if (s["voted"] === true)
        this.votedSuggestions.push(s);
      else
        this.availableSuggestions.push(s);
    });
  }

  /**
   * Returns the user to the home page
   */
  disconnect(){
    this.router.navigate(['admin-begin']);
  }

  /**
   * Loads the new suggestion client page
   */
  newSuggestion(){
    this.router.navigate(['new-suggestion']);
  }

  /**
   * Vote for a suggestion and remove it from the available suggestions list
   * @param suggestion suggestion to vote for
   */
  async voteSuggestion(suggestion){
    let res = await this.suggestions.voteSuggestion(suggestion.suggestionId);
    if (res) {
      this.votedSuggestions.push(suggestion);
      this.availableSuggestions = this.availableSuggestions.filter(s =>
        s.suggestionId !== suggestion.suggestionId
      );

      suggestion['voted'] = true;
    }
  }

  /**
   * This function sort and return the available suggestions when called
   */
  private getAvailableSuggestions() {
    return this.availableSuggestions.sort((a, b) => b.votes - a.votes);
  }

  /**
   * Set up the listener for new suggestion when the page starts
   */
  ngOnInit() {
    this.suggestions.onNewSuggestion((suggestion) => {
      this.updateSuggestions();
      this.notification.displayNotification(
          "Une nouvelle question suggérée est disponible",
          suggestion['suggestion']);
    });

    this.suggestions.onNewVote((suggestionId) => {
      let suggestion = this.availableSuggestions.find(s => s.suggestionId == suggestionId);
      suggestion["votes"]++;
    });

    // Remove the deleted suggestion
    this.suggestions.onDeletedSuggestion(suggestionId => {
      this.availableSuggestions = this.availableSuggestions.filter(s =>
        s.suggestionId !== suggestionId
      );
    });
  }

  /**
   * Update the list of questions when the page has loaded
   */
  ionViewWillEnter(){
    this.updateSuggestions();
  }
}
