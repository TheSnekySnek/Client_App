import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenQuestionStatsPage } from './openquestion-stats.page';

describe('OpenQuestionStatsPage', () => {
  let component: OpenQuestionStatsPage;
  let fixture: ComponentFixture<OpenQuestionStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenQuestionStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenQuestionStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
