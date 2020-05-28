import { TestBed } from '@angular/core/testing';

import { SuggestionService } from './suggestion.service';
import { NotificationService } from './notification.service'
import { ConnectionService } from './connection.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

describe('SuggestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, LocalNotifications, UniqueDeviceID, ConnectionService]
    })

  });

  it('should be created', () => {
    const service: SuggestionService = TestBed.get(SuggestionService);
    expect(service).toBeTruthy();
  });
});
