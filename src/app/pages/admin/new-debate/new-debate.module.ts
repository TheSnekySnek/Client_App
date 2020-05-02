import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDebatePageRoutingModule } from './new-debate-routing.module';

import { NewDebatePage } from './new-debate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDebatePageRoutingModule
  ],
  declarations: [NewDebatePage]
})
export class NewDebatePageModule {}
