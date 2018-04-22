import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotEvalComponent } from './chatbot-eval.component';

describe('ChatbotEvalComponent', () => {
  let component: ChatbotEvalComponent;
  let fixture: ComponentFixture<ChatbotEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
