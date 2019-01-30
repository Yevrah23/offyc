import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDownloadComponent } from './warning-download.component';

describe('WarningDownloadComponent', () => {
  let component: WarningDownloadComponent;
  let fixture: ComponentFixture<WarningDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
