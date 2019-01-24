import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSpinnerComponent } from './data-spinner.component';

describe('DataSpinnerComponent', () => {
  let component: DataSpinnerComponent;
  let fixture: ComponentFixture<DataSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
