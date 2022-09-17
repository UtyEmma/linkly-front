import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResizeComponent } from './img-resize.component';

describe('ImgResizeComponent', () => {
  let component: ImgResizeComponent;
  let fixture: ComponentFixture<ImgResizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
