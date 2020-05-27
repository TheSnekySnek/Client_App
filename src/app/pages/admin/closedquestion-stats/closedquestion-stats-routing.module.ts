import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClosedQuestionStatsPage } from './closedquestion-stats.page';

const routes: Routes = [
  {
    path: '',
    component: ClosedQuestionStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClosedQuestionStatsPageRoutingModule {}
