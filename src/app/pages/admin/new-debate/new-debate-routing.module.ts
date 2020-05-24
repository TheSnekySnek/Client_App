import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDebatePage } from './new-debate.page';

const routes: Routes = [
  {
    path: '',
    component: NewDebatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDebatePageRoutingModule {}
