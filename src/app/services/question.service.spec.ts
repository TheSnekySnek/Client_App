import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { NotificationService } from './notification.service'
import { ConnectionService } from './connection.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


describe('QuestionService', () => {
  beforeEach(async () => {
    
    TestBed.configureTestingModule({
      providers: [NotificationService, LocalNotifications, UniqueDeviceID, ConnectionService]
    })
    
});

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });

  /*it('should get the questions in a debate', async () => {
    const qs: QuestionService = TestBed.get(QuestionService);
    const cs: ConnectionService = TestBed.get(ConnectionService);
    const testConfig: ConfigService = TestBed.get(ConfigService);
    await cs.join(testConfig.getTestConfig()['TEST_DEBATE_CODE']);
    var questions = await qs.getQuestions();
    expect(questions).toBeDefined();
  });*/
});
