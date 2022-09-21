import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupMobileComponent } from './mockup-mobile.component';

describe('MockupMobileComponent', () => {
  let component: MockupMobileComponent;
  let fixture: ComponentFixture<MockupMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockupMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockupMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
