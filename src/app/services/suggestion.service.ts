import { Injectable } from '@angular/core';
import {ConnectionService} from "./connection.service";
import {NotificationService} from "./notification.service";

const NEW_SUGGESTION_TITLE: string = "Une nouvelle question suggérée est disponible";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  // We need to save the question between pages
  votedSuggestions  : number[] = [];

  constructor(
      private connection  : ConnectionService,
      private notification: NotificationService
  ) { }

  /**
   * Retrieves the suggestions of the debate
   */
  public getSuggestions(): Promise<any[]>  {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("getSuggestedQuestions",
          (suggestions: any[]) => {
            resolve(suggestions);
          }
      );
    });
  }

  /**
   * Send's the user's vote to a suggestion
   * @param suggestionId  Id of the suggestion
   */
  public voteSuggestion(suggestionId: number) {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("voteSuggestedQuestion", suggestionId,
          (result: boolean) => {
            if(result)
              that.votedSuggestions.push(suggestionId);

            resolve(result);
          }
      );
    });
  }

  /**
   * Calls a function when a new question is available
   * @param callback Function to call
   */
  public onNewSuggestion(callback: Function) {
    this.connection.socket.on("suggestedQuestion",
        (suggestion: any) => {
          // Send a notification
          this.notification.displayNotification(
              NEW_SUGGESTION_TITLE,
              suggestion['suggestion']
          )

          // Call the callback
          callback(suggestion)
        }
    );
  }

  /**
   * Calls a function when a suggestion must be deleted
   * @param callback Function to call
   */
  public onDeletedSuggestion(callback: Function) {
    this.connection.socket.on("deletedSuggestion",
      (suggestionId: number) => {
        // Call the callback
        callback(suggestionId)
      }
    );
  }

  /**
   * Calls a function when a new vote has been made
   * @param callback Function to call
   */
  public onNewVote(callback: Function) {
    this.connection.socket.on("newVote",
      (suggestionId: number) => {
        // Call the callback
        callback(suggestionId)
      }
    );
  }

  /**
   * Suggest a question to be added to the debate
   * @param question Suggested question
   */
  public suggestQuestion(question: any): Promise<boolean | number> {
    var that = this;
    return new Promise<boolean | number>(async function (resolve, reject) {
      that.connection.socket.emit("suggestQuestion",
          question, (result: boolean | number) => {
            resolve(result);
          }
      );
    });
  }
}
