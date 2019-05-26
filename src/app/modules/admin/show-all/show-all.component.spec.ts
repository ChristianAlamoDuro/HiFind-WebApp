import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllComponent } from './show-all.component';

describe('ShowAllComponent', () => {
  let component: ShowAllComponent;
  let fixture: ComponentFixture<ShowAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
