import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBeginPage } from './admin-begin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBeginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminBeginPageRoutingModule {}
