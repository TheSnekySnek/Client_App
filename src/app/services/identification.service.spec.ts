import { TestBed } from '@angular/core/testing';

import { IdentificationService } from './identification.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform } from '@ionic/angular';

describe('IdentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UniqueDeviceID, Platform]
  }));

  it('should be created', () => {
    const service: IdentificationService = TestBed.get(IdentificationService);
    expect(service).toBeTruthy();
  });

  it('should identify the device', () => {
    const service: IdentificationService = TestBed.get(IdentificationService);
    const uuid = service.getUUID()
    expect(service).toBeTruthy();
    expect(uuid).toBeDefined()
  });
});
