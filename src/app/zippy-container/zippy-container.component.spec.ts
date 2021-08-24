import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippyContainerComponent } from './zippy-container.component';

describe('ZippyContainerComponent', () => {
  let component: ZippyContainerComponent;
  let fixture: ComponentFixture<ZippyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZippyContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZippyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
