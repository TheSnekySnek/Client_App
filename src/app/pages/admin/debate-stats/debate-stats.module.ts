import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateStatsPageRoutingModule } from './debate-stats-routing.module';

import { DebateStatsPage } from './debate-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateStatsPageRoutingModule
  ],
  declarations: [DebateStatsPage]
})
export class DebateStatsPageModule {}
