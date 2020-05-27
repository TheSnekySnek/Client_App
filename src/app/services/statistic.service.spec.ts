import { TestBed } from '@angular/core/testing';

import { StatService } from './statistic.service';
import { NotificationService } from './notification.service'
import { ConnectionService } from './connection.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

describe('StatisticService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationService, LocalNotifications, UniqueDeviceID, ConnectionService]
        })

    });

    it('should be created', () => {
        const service: StatService = TestBed.get(StatService);
        expect(service).toBeTruthy();
    });
});
