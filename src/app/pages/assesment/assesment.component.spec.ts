import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentComponent } from './assesment.component';

describe('AssesmentComponent', () => {
  let component: AssesmentComponent;
  let fixture: ComponentFixture<AssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
