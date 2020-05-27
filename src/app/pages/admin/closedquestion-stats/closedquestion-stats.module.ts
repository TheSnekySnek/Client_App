import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClosedQuestionStatsPageRoutingModule } from './closedquestion-stats-routing.module';

import { ClosedQuestionStatsPage } from './closedquestion-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosedQuestionStatsPageRoutingModule
  ],
  declarations: [ClosedQuestionStatsPage]
})
export class ClosedQuestionStatsPageModule {}
