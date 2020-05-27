import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSuggestionPage } from './new-suggestion.page';
import {FormsModule} from "@angular/forms";

describe('NewSuggestionPage', () => {
  let component: NewSuggestionPage;
  let fixture: ComponentFixture<NewSuggestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSuggestionPage ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSuggestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
