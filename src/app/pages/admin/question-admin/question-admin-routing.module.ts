import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionAdminPage} from './question-admin.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAdminPage,
    children: [
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../closedquestion-stats/closedquestion-stats.module').then(m => m.ClosedQuestionStatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/question-admin/stats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/question-admin/stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAdminPageRoutingModule {}
