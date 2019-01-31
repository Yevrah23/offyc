import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegViewComponent } from './reg-view.component';

describe('RegViewComponent', () => {
  let component: RegViewComponent;
  let fixture: ComponentFixture<RegViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
