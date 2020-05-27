import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service'
import { ConnectionService } from './connection.service';

const NEW_QUESTION_TITLE: string = "Une nouvelle question-admin est disponible";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // We need to save the question-admin between pages
  savedQuestion     : any;
  answeredQuestions : number[] = [];

  constructor(
    private connection  : ConnectionService,
    private notification: NotificationService
  ) { }
  
  /**
   * Retrieves the questions of the debate
   */    
  public getQuestions(): Promise<any[]>  {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("getQuestions",
        (questions: any[]) => {
          resolve(questions);
        }
      );
    });
  }

  /**
   * Retrieves the questions of the debate
   */
  public getResponses(): Promise<any[]>  {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("getQuestions",
          (questions: any[]) => {
            for (let i = 0; i < questions.length; i++) {
              if(that.answeredQuestions.includes(questions[i]['id']))
                questions[i]['answered'] = true
              else
                questions[i]['answered'] = false

            }
            resolve(questions);
          }
      );
    });
  }

  /**
   * Send's the user's answer of a closed question-admin
   * @param questionId  Id of the question-admin
   * @param answerId    Id of the answer
   */
  public answerQuestion(questionId: number, answerId: number) {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("answerQuestion",
        {
          questionId: questionId,
          answerId: answerId
        },
        (result: boolean) => {
          if(result)
            that.answeredQuestions.push(questionId)
          resolve(result);
        }
      );
    });
  }

  /**
   * Send's the user's answer of an open question-admin
   * @param questionId  Id of the question-admin
   * @param answer      User's answer
   */
  public answerOpenQuestion(questionId: number, answer: string) {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.connection.socket.emit("answerOpenQuestion",
        {
          questionId: questionId,
          answer: answer
        },
        (result: boolean) => {
          if(result)
            that.answeredQuestions.push(questionId);
          resolve(result);
        }
      );
    });
  }

  /**
   * Calls a function when a new question-admin is available
   * @param callback Function to call
   */
  public onNewQuestion(callback: Function) {
    this.connection.socket.on("newQuestion",
      (question: any) => {
        // Send a notification
        this.notification.displayNotification(
          NEW_QUESTION_TITLE,
          question['title']
        )

        if (question["id"] in this.answeredQuestions)
          question["answered"] = true;

        // Call the callback
        callback(question)
      }
    );
  }

  /**
<<<<<<< HEAD
   * Suggest a question-admin to be added to the debate
   * @param question Suggested question-admin
   */
  public suggestQuestion(question: any): Promise<boolean> {
    var that = this;
    return new Promise<boolean>(async function (resolve, reject) {
      that.connection.socket.emit("suggestQuestion",
        question, (result: boolean) => {
          resolve(result);
        }
      );
    });
  }

  /**
   * Saves the question for use in another page
   * @param question Question to save
   */
  public saveQuestion(question: any) {
    this.savedQuestion = question;
  }

  /**
   * Retrieves the saved question-admin
   */
  public getSavedQuestion() {
    return this.savedQuestion;
  }
}
