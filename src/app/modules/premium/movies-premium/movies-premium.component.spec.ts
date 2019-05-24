import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPremiumComponent } from './movies-premium.component';

describe('MoviesPremiumComponent', () => {
  let component: MoviesPremiumComponent;
  let fixture: ComponentFixture<MoviesPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
