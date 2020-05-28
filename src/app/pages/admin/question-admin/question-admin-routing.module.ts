import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionAdminPage} from './question-admin.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAdminPage,
    children: [
      {
        path: 'closedstats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../closedquestion-stats/closedquestion-stats.module').then(m => m.ClosedQuestionStatsPageModule)
          }
        ]
      },
      {
        path: 'openstats',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../openquestion-stats/openquestion-stats.module').then(m => m.OpenQuestionStatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/question-admin/closedstats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/question-admin/closedstats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAdminPageRoutingModule {}
