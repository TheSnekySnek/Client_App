import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionPage } from './question.page';
import {FormsModule} from "@angular/forms";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {RouterTestingModule} from "@angular/router/testing";
import {UniqueDeviceID} from "@ionic-native/unique-device-id/ngx";
import {Router} from "@angular/router";

describe('QuestionPage', () => {
  let component: QuestionPage;
  let fixture: ComponentFixture<QuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [LocalNotifications, UniqueDeviceID]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
