import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSuggestionPage } from './new-suggestion.page';

const routes: Routes = [
  {
    path: '',
    component: NewSuggestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSuggestionPageRoutingModule {}
