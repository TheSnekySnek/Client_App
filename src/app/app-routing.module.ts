import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/client/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/client/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/client/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'new-suggestion',
    loadChildren: () => import('./pages/client/new-suggestion/new-suggestion.module').then(m => m.NewSuggestionPageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./pages/admin/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-newDebate',
    loadChildren: () => import('./pages/admin/new-debate/new-debate.module').then( m => m.NewDebatePageModule)
  },
  {
    path: 'debate',
    loadChildren: () => import('./pages/admin/debate/debate.module').then( m => m.DebatePageModule)
  },
  {
    path: 'debate-new-question',
    loadChildren: () => import('./pages/admin/debate-new-question/debate-new-question.module').then( m => m.DebateNewQuestionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
