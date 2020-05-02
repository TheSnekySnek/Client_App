import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateSuggestedQuestionsPageRoutingModule } from './debate-suggested-questions-routing.module';

import { DebateSuggestedQuestionsPage } from './debate-suggested-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateSuggestedQuestionsPageRoutingModule
  ],
  declarations: [DebateSuggestedQuestionsPage]
})
export class DebateSuggestedQuestionsPageModule {}
