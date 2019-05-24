import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPremiumComponent } from './user-premium.component';

describe('UserPremiumComponent', () => {
  let component: UserPremiumComponent;
  let fixture: ComponentFixture<UserPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
