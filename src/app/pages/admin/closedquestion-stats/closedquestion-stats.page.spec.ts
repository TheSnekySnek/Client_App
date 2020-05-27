import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClosedQuestionStatsPage } from './closedquestion-stats.page';

describe('ClosedQuestionStatsPage', () => {
  let component: ClosedQuestionStatsPage;
  let fixture: ComponentFixture<ClosedQuestionStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedQuestionStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClosedQuestionStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
