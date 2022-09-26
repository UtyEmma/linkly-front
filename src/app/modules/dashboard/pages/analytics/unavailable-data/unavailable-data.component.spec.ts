import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableDataComponent } from './unavailable-data.component';

describe('UnavailableDataComponent', () => {
  let component: UnavailableDataComponent;
  let fixture: ComponentFixture<UnavailableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnavailableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnavailableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
