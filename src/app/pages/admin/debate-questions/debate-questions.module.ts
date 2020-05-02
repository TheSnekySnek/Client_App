import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateQuestionsPageRoutingModule } from './debate-questions-routing.module';

import { DebateQuestionsPage } from './debate-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateQuestionsPageRoutingModule
  ],
  declarations: [DebateQuestionsPage]
})
export class DebateQuestionsPageModule {}
