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
  availableSuggestions: any[] = [];
  votedSuggestions : any[] = [];

  constructor(
      private suggestions : SuggestionService,
      private router      : Router,
      private notification: NotificationService
  ) {}

  /**
   * Updates the list of question
   */
  private async updateSuggestions(){
    console.log("GETTING SUGGESTIONS");
    this.availableSuggestions = [];
    this.votedSuggestions = [];

    var suggestions = await this.suggestions.getSuggestions();
    console.log(suggestions);
    suggestions.forEach(s => {
      if(s['voted'])
        this.votedSuggestions.push(s);
      else
        this.availableSuggestions.push(s);
    });
  }

  // /**
  //  * Saves the question and loads the question page
  //  * @param question Question to view
  //  */
  // viewQuestion(question){
  //   this.questions.saveQuestion(question);
  //   this.router.navigate(['question']);
  // }

  /**
   * Loads the new suggestion client page
   */
  newSuggestion(){
    this.router.navigate(['new-question']);
  }

  /**
   * Set up the listener for new suggestion when the page starts
   */
  ngOnInit() {
    this.suggestions.onNewSuggestion((suggestion) => {
      this.availableSuggestions.push(suggestion);
      this.notification.displayNotification(
          "Une nouvelle question suggérée est disponible",
          suggestion['suggestion']);
    })
  }

  /**
   * Update the list of questions when the page has loaded
   */
  ionViewWillEnter(){
    this.updateSuggestions();
  }
}
