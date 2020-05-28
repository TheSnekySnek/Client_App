import { Component, OnInit } from '@angular/core';
import { DebateService } from 'src/app/services/debate.service';
import {NavigationExtras, Router} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-debate-new-question',
  templateUrl: './debate-new-question.page.html',
  styleUrls: ['./debate-new-question.page.scss'],
})
export class DebateNewQuestionPage implements OnInit {

  debate          : any;
  isOpenQuestion  : boolean   = false;
  numAnswers      : number    = 2;
  title           : string;
  description     : string;
  answers         : string[]  = new Array(8);

  constructor(
    private notification  : NotificationService,
    private debateManager : DebateService,
    private router        : Router,  
    public menuCtrl       : MenuController

    ) {}

  /**
   * Adds a question to the debate via the question service
   */
  async addQuestion() {
    if (!this.title || this.title.length == 0) {
      this.notification.displayError("Veuillez spécifier un titre");
      return;
    }
    if (!this.description || this.description.length == 0) {
      this.notification.displayError("Veuillez spécifier une description");
      return;
    }

    if (!this.isOpenQuestion) {
      var ans = [];
      for (let i = 0; i < this.numAnswers; i++) {
        ans.push(this.answers[i]);
      }
    }

    var status = await this.debateManager.addQuestion({
      debateId      : this.debate['debateId'],
      title         : this.title,
      description   : this.description,
      answers       : ans,
      isOpenQuestion: this.isOpenQuestion
    });

    if (status) {
      this.notification.displayInfo("Question envoyée");
      // Use navigation extra to refresh the questions
      let navigationExtras : NavigationExtras = {
        state: {
          refresh: true
        }
      };
      this.router.navigate(['/debate/questions'], navigationExtras);
    }
    else {
      this.notification.displayError(
        "Une erreur est surveue lors de l'envoi de la question"
      );
    }
  }

  /**
   * Load the debate on page init
   */
  ngOnInit() {
    this.debate = this.debateManager.getSavedDebate();
  }

  //This lets us display the right number of inputs
  arrayTwo(n: number): number[] {
    return [...Array(n).keys()];
  }

  /**
   * Closes the menu automatically
   */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
