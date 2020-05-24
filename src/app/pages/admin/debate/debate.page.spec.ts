import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebatePage } from './debate.page';

describe('DebatePage', () => {
  let component: DebatePage;
  let fixture: ComponentFixture<DebatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DebatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
