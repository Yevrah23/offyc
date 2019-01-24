import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateComponent } from './report-template.component';

describe('ReportTemplateComponent', () => {
  let component: ReportTemplateComponent;
  let fixture: ComponentFixture<ReportTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
