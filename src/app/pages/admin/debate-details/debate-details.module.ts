import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateDetailsPageRoutingModule } from './debate-details-routing.module';

import { DebateDetailsPage } from './debate-details.page';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateDetailsPageRoutingModule,
    QRCodeModule
  ],
  declarations: [DebateDetailsPage]
})
export class DebateDetailsPageModule {}
