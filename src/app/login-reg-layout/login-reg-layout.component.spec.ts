import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegLayoutComponent } from './login-reg-layout.component';

describe('LoginRegLayoutComponent', () => {
  let component: LoginRegLayoutComponent;
  let fixture: ComponentFixture<LoginRegLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
