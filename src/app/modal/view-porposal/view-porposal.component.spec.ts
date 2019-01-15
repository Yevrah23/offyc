import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPorposalComponent } from './view-porposal.component';

describe('ViewPorposalComponent', () => {
  let component: ViewPorposalComponent;
  let fixture: ComponentFixture<ViewPorposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPorposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPorposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
