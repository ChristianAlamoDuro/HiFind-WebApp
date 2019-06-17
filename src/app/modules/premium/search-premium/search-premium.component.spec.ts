import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPremiumComponent } from './search-premium.component';

describe('SearchPremiumComponent', () => {
  let component: SearchPremiumComponent;
  let fixture: ComponentFixture<SearchPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
