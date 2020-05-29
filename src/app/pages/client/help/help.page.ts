import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  /**
   * Returns the user to the home page
   */
  disconnect(){
    this.router.navigate(['admin-begin']);
  }
  

  ngOnInit() {
  }

}
