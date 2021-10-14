import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeetPopUpComponent } from './employeet-pop-up.component';

describe('EmployeetPopUpComponent', () => {
  let component: EmployeetPopUpComponent;
  let fixture: ComponentFixture<EmployeetPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeetPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeetPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
