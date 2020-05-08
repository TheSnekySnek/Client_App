import { TestBed } from '@angular/core/testing';

import { ConnectionService } from './connection.service';
import { NotificationService } from './notification.service'
import { IdentificationService } from './identification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ConfigService } from './config.service';

describe('ConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotificationService, 
      LocalNotifications, 
      IdentificationService, 
      UniqueDeviceID,
    ]
  }));

  it('should be created', () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    expect(service).toBeTruthy();
  });

  // Debate isn't fully implemented server side yet
  /*it('should be able to join a debate', async () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    const testConfig: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
    var status = await service.join(
      testConfig.getTestConfig()['TEST_DEBATE_CODE']
    );
    expect(status['connected']).toBeTruthy()
    expect(service.isConnected()).toBeTruthy()
    
  });*/

  //Debate isn't implemented server side yet
  /*it('should not login with wrong credentials', async () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    expect(service).toBeTruthy();

    var status = await service.join(
      testConfig.getTestConfig()['TEST_WRONG_DEBATE_CODE']
    );
    expect(status['connected']).toBeFalsy()
    expect(service.isConnected()).toBeFalsy()
    
  });*/

  it('should login as an admin', async () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    const testConfig: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
    
    var status = await service.login(
      testConfig.getTestConfig()['TEST_USERNAME'],
      testConfig.getTestConfig()['TEST_PASSWORD']
    );
    expect(status['connected']).toBeTruthy()
    expect(service.isConnected()).toBeTruthy()
  });

  it('should not login with wrong credentials', async () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    const testConfig: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();

    var status = await service.login(
      testConfig.getTestConfig()['TEST_USERNAME'],
      testConfig.getTestConfig()['TEST_WRONG_PASSWORD']
    );
    expect(status['connected']).toBeFalsy()
    expect(service.isConnected()).toBeFalsy()
  });
});