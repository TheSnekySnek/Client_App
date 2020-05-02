import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebateSuggestedQuestionsPage } from './debate-suggested-questions.page';

describe('DebateSuggestedQuestionsPage', () => {
  let component: DebateSuggestedQuestionsPage;
  let fixture: ComponentFixture<DebateSuggestedQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateSuggestedQuestionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DebateSuggestedQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
