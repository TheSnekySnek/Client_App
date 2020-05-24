import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateStatsPage } from './debate-stats.page';

const routes: Routes = [
  {
    path: '',
    component: DebateStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateStatsPageRoutingModule {}
