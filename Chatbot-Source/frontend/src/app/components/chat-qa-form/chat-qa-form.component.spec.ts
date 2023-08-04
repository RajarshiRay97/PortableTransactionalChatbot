import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatQaFormComponent } from './chat-qa-form.component';

describe('ChatQaFormComponent', () => {
  let component: ChatQaFormComponent;
  let fixture: ComponentFixture<ChatQaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatQaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatQaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
