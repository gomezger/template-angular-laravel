import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmallLoadingComponent } from './small-loading.component';

describe('SmallLoadingComponent', () => {
  let component: SmallLoadingComponent;
  let fixture: ComponentFixture<SmallLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
