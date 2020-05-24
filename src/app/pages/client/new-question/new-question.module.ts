import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQuestionPageRoutingModule } from './new-question-routing.module';

import { NewQuestionPage } from './new-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQuestionPageRoutingModule
  ],
  declarations: [NewQuestionPage]
})
export class NewQuestionPageModule {}
