import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateDetailsPage } from './debate-details.page';

const routes: Routes = [
  {
    path: '',
    component: DebateDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateDetailsPageRoutingModule {}
