import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuggestionsPage } from './suggestions.page';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {UniqueDeviceID} from "@ionic-native/unique-device-id/ngx";
import {SuggestionService} from "../../../services/suggestion.service";
import {ConnectionService} from "../../../services/connection.service";

describe('SuggestionsPage', () => {
  let component: SuggestionsPage;
  let fixture: ComponentFixture<SuggestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsPage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [ConnectionService, SuggestionService, LocalNotifications, UniqueDeviceID]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
