import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkImgComponent } from './link-img.component';

describe('LinkImgComponent', () => {
  let component: LinkImgComponent;
  let fixture: ComponentFixture<LinkImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
