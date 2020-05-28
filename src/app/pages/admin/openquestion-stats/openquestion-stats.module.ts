import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenQuestionStatsPageRoutingModule } from './openquestion-stats-routing.module';

import { OpenQuestionStatsPage } from './openquestion-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenQuestionStatsPageRoutingModule
  ],
  declarations: [OpenQuestionStatsPage]
})
export class OpenQuestionStatsPageModule {}
