import { TestBed } from '@angular/core/testing';

import { DebateService } from './debate.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

describe('DebateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LocalNotifications, UniqueDeviceID]
  }));

  it('should be created', () => {
    const service: DebateService = TestBed.get(DebateService);
    expect(service).toBeTruthy();
  });
});
