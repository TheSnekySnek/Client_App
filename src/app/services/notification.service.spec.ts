import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ToastController, LocalNotifications]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
  
  //More test to come once pages are setup
});
