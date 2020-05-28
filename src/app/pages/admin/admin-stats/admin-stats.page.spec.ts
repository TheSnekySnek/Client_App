import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminStatsPage } from './admin-stats.page';

describe('DebateStatsPage', () => {
  let component: AdminStatsPage;
  let fixture: ComponentFixture<AdminStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
