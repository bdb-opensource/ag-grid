import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgGridAngular } from './ag-grid-angular.component';

describe('MyLibComponent', () => {
  let component: AgGridAngular;
  let fixture: ComponentFixture<AgGridAngular>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridAngular ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
