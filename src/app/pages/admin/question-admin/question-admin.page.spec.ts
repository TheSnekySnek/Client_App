import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionAdminPage } from './question-admin.page';

describe('QuestionAdminPage', () => {
  let component: QuestionAdminPage;
  let fixture: ComponentFixture<QuestionAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
