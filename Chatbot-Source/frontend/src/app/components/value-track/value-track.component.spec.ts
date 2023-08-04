import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTrackComponent } from './value-track.component';

describe('ValueTrackComponent', () => {
  let component: ValueTrackComponent;
  let fixture: ComponentFixture<ValueTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
