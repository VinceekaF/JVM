import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReasonComponent } from './app-reason.component';

describe('AppReasonComponent', () => {
  let component: AppReasonComponent;
  let fixture: ComponentFixture<AppReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
