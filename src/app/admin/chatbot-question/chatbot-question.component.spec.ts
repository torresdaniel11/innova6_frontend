import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotQuestionComponent } from './chatbot-question.component';

describe('ChatbotQuestionComponent', () => {
  let component: ChatbotQuestionComponent;
  let fixture: ComponentFixture<ChatbotQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
