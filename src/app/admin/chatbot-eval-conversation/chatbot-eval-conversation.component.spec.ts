import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotEvalConversationComponent } from './chatbot-eval-conversation.component';

describe('ChatbotEvalConversationComponent', () => {
  let component: ChatbotEvalConversationComponent;
  let fixture: ComponentFixture<ChatbotEvalConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotEvalConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotEvalConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
