import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateNewQuestionPage } from './debate-new-question.page';

const routes: Routes = [
  {
    path: '',
    component: DebateNewQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateNewQuestionPageRoutingModule {}
