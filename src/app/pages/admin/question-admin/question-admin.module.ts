import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionAdminPage } from './question-admin.page';
import { QuestionAdminPageRoutingModule } from './question-admin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionAdminPageRoutingModule
  ],
  declarations: [QuestionAdminPage]
})
export class QuestionAdminPageModule {}
