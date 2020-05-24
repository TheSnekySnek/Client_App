import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateSuggestedQuestionsPage } from './debate-suggested-questions.page';

const routes: Routes = [
  {
    path: '',
    component: DebateSuggestedQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateSuggestedQuestionsPageRoutingModule {}
