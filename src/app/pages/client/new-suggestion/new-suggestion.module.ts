import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSuggestionPageRoutingModule } from './new-suggestion-routing.module';

import { NewSuggestionPage } from './new-suggestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSuggestionPageRoutingModule
  ],
  declarations: [NewSuggestionPage]
})
export class NewSuggestionPageModule {}
