import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebateStatsPage } from './debate-stats.page';

describe('DebateStatsPage', () => {
  let component: DebateStatsPage;
  let fixture: ComponentFixture<DebateStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DebateStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
