import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'questions',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../questions/questions.module').then(m => m.QuestionsPageModule)
          }
        ]
      },
      {
        path: 'suggestions',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../suggestions/suggestions.module').then(m => m.SuggestionsPageModule)
          }
        ]
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../help/help.module').then(m => m.HelpPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/questions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/questions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
