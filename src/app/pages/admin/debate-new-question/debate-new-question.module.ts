import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateNewQuestionPageRoutingModule } from './debate-new-question-routing.module';

import { DebateNewQuestionPage } from './debate-new-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateNewQuestionPageRoutingModule
  ],
  declarations: [DebateNewQuestionPage]
})
export class DebateNewQuestionPageModule {}
