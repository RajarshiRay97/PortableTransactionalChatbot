import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorComponent } from './locator.component';

describe('RightPanelComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
