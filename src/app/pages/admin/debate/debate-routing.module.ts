import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebatePage } from './debate.page';

const routes: Routes = [
  {
    path: '',
    component: DebatePage,
    children: [
      {
        path: 'questions',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../debate-questions/debate-questions.module').then(m => m.DebateQuestionsPageModule)
          }
        ]
      },
      {
        path: 'suggestions',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../debate-suggested-questions/debate-suggested-questions.module').then(m => m.DebateSuggestedQuestionsPageModule)
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../debate-stats/debate-stats.module').then(m => m.DebateStatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/debate/questions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/debate/questions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebatePageRoutingModule {}
