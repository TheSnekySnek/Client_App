import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebateDetailsPage } from './debate-details.page';
import {FormsModule} from "@angular/forms";
import {QRCodeModule} from "angularx-qrcode";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

describe('DebateDetailsPage', () => {
  let component: DebateDetailsPage;
  let fixture: ComponentFixture<DebateDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateDetailsPage ],
      imports: [IonicModule.forRoot(), FormsModule, QRCodeModule, RouterTestingModule],
      providers: [LocalNotifications,
        UniqueDeviceID,
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DebateDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
