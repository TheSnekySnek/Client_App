import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebateNewQuestionPage } from './debate-new-question.page';

describe('DebateNewQuestionPage', () => {
  let component: DebateNewQuestionPage;
  let fixture: ComponentFixture<DebateNewQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateNewQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DebateNewQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
