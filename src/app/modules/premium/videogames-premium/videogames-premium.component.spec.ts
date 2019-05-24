import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesPremiumComponent } from './videogames-premium.component';

describe('VideogamesPremiumComponent', () => {
  let component: VideogamesPremiumComponent;
  let fixture: ComponentFixture<VideogamesPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideogamesPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
