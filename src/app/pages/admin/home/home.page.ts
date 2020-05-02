import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebateService } from 'src/app/services/debate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private activeDebates: any[] = [];
  private pastDebates: any[] = [];

  constructor(private router: Router, private debateManager: DebateService) { }

  private async updateDebates(){
    this.activeDebates = [];
    this.pastDebates = [];
    var debates = await this.debateManager.getDebates();
    console.log(debates)
    debates.forEach(debate => {
      //We want to check if the debate has ended, later on
      this.activeDebates.push(debate)
    });
  }

  viewDebate(debate: any){
    this.debateManager.saveDebate(debate);
    this.router.navigate(['debate']);
  }

  newDebate(){
    this.router.navigate(['admin-newDebate']);
  }

  ionViewWillEnter(){
    this.updateDebates()
  }

  ngOnInit() {
  }

}
