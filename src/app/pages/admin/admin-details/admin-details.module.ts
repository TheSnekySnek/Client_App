import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDetailPage } from './admin-details.page';
import { AdminDetailRoutingModule } from './admin-details-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDetailRoutingModule
  ],
  declarations: [AdminDetailPage]
})
export class AdminDetailPageModule {}
