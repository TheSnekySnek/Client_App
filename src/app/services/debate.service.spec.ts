import { TestBed } from '@angular/core/testing';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ConnectionService } from './connection.service';
import { DebateService } from './debate.service';
import { NotificationService } from './notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

describe('DebateService', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [NotificationService, LocalNotifications, UniqueDeviceID, ConnectionService]
        });
    });

    it ('should be created', () => {
       const service: DebateService = TestBed.get(DebateService);
       expect(service).toBeTruthy();
    });
});
