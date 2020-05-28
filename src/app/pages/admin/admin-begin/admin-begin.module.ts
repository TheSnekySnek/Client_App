import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBeginPageRoutingModule } from './admin-begin-routing.module';

import { AdminBeginPage } from './admin-begin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBeginPageRoutingModule
  ],
  declarations: [AdminBeginPage]
})
export class AdminBeginPageModule {}
