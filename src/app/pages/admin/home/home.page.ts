import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebateService } from 'src/app/services/debate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private activeDebates : any[] = [];
  private pastDebates   : any[] = [];

  constructor(
    private router        : Router, 
    private debateManager : DebateService
  ) {}

  /**
   * Update the list of debates
   */
  private async updateDebates(){
    this.activeDebates = [];
    this.pastDebates = [];
    var debates = await this.debateManager.getDebates();
    console.log(debates);
    debates.forEach(debate => {
      //We want to check if the debate has ended, later on
      this.activeDebates.push(debate);
    });
  }

  /**
   * Saves the debate and load the debate page
   * @param debate Debate to view
   */
  viewDebate(debate: any){
    this.debateManager.saveDebate(debate);
    this.router.navigate(['debate']);
  }

  /**
   * Loads the new debate page
   */
  newDebate(){
    this.router.navigate(['admin-newDebate']);
  }

  /**
   * Updates the list of debates when the page loads
   */
  ionViewWillEnter(){
    this.updateDebates();
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
  }

}
