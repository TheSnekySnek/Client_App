import { TestBed } from '@angular/core/testing';


import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });

  it('should have loaded the Admin config', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.getAdminConfig()).toBeDefined();
  });

  it('should have loaded the Client config', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.getAdminConfig()).toBeDefined();
  });

  it('should have loaded the Test config', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.getTestConfig()).toBeDefined();
  });
});
