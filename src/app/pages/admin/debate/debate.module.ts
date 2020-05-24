import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebatePage } from './debate.page';
import { DebatePageRoutingModule } from './debate-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebatePageRoutingModule
  ],
  declarations: [DebatePage]
})
export class DebatePageModule {}
