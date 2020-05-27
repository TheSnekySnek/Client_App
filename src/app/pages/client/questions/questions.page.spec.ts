import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {QuestionService} from "../../../services/question.service";
import {ConnectionService} from "../../../services/connection.service";

describe('QuestionsPageClient', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsPage ],
      imports: [FormsModule, IonicModule.forRoot(), RouterTestingModule],
      providers: [ConnectionService, QuestionService, LocalNotifications, UniqueDeviceID]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
