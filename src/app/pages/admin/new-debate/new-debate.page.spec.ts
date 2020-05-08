import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDebatePage } from './new-debate.page';

describe('NewDebatePage', () => {
  let component: NewDebatePage;
  let fixture: ComponentFixture<NewDebatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDebatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDebatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
