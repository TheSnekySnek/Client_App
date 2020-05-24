import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateQuestionsPage } from './debate-questions.page';

const routes: Routes = [
  {
    path: '',
    component: DebateQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateQuestionsPageRoutingModule {}
