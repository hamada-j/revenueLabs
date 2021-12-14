import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilizationComponent } from './civilization.component';

describe('CivilizationComponent', () => {
  let component: CivilizationComponent;
  let fixture: ComponentFixture<CivilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
